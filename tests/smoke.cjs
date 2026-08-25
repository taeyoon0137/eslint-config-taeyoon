const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");

const { ESLint } = require("eslint");

/*
 * Require the package through its public subpath exports instead of importing
 * local source files. This keeps the smoke test close to how downstream
 * projects consume the published package after it has been built.
 */
const base = require("eslint-config-taeyoon/base");
const react = require("eslint-config-taeyoon/react");
const reactNative = require("eslint-config-taeyoon/react-native");
const prettier = require("eslint-config-taeyoon/prettier");
const packageJson = require("eslint-config-taeyoon/package.json");

/**
 * Verifies the public export shapes before checking individual rule behavior.
 *
 * A broken package.json "exports" map, missing build output, or accidental
 * default-export shape change should fail here with a direct message.
 *
 * @returns {void}
 */
function assertConfigExports() {
  // All ESLint flat config presets exported by this package should be arrays
  // that consumers can spread into eslint.config.js.
  assert.ok(Array.isArray(base), "base export should be a config array");
  assert.ok(Array.isArray(react), "react export should be a config array");
  assert.ok(Array.isArray(reactNative), "react-native export should be a config array");

  // The prettier subpath intentionally exports the JSON config object rather
  // than an ESLint flat config array.
  assert.equal(typeof prettier, "object", "prettier export should be an object");

  // eslint-plugin-import has had interop issues in shareable configs before.
  // Checking the loaded plugin object catches packaging mistakes where a module
  // wrapper or unresolved import would leave rules unavailable at runtime.
  const importPlugin = base.find((config) => config.plugins?.import)?.plugins.import;
  assert.equal(typeof importPlugin, "object", "import plugin should be a plugin object");
  assert.equal(typeof importPlugin.rules, "object", "import plugin should expose rules");

  // React presets are standalone in this package. These checks make sure the
  // higher-level presets still include their lower-level building blocks instead
  // of only exporting the React-specific rule fragments.
  assert.ok(react.some((config) => config.plugins?.["@typescript-eslint"]), "react preset should include base rules");
  assert.ok(reactNative.some((config) => config.plugins?.react), "react-native preset should include react rules");
}

/**
 * Verifies the peer dependency contract shipped to package consumers.
 *
 * The TypeScript preset is part of the base export, so both ESLint and
 * TypeScript must be provided by the consuming project under strict package
 * managers such as Yarn PnP.
 *
 * @returns {void}
 */
function assertPeerDependencies() {
  assert.equal(packageJson.peerDependencies.eslint, "^9.7.0", "package should declare its ESLint peer range");
  assert.equal(
    packageJson.peerDependencies.typescript,
    ">=4.8.4 <6.1.0",
    "package should declare its TypeScript peer range",
  );
  assert.equal(
    packageJson.peerDependenciesMeta?.typescript?.optional,
    undefined,
    "TypeScript should remain a required peer dependency",
  );
}

/**
 * Runs ESLint against an in-memory source string with the supplied flat config.
 *
 * The file path is part of the test input because ESLint uses it to decide
 * which filename-based config entries apply, especially for TypeScript, JSX,
 * and TSX.
 *
 * @param {import("eslint").Linter.Config[]} config ESLint flat config to test.
 * @param {string} code Source code passed to ESLint.lintText.
 * @param {string} filePath Virtual file path used for extension-based matching.
 * @returns {Promise<Array<string | null>>} Rule ids reported by ESLint.
 */
async function lint(config, code, filePath) {
  // overrideConfigFile: true disables lookup of any eslint.config.js in this
  // repository, so each assertion only validates the package preset passed in.
  const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: config });
  const [result] = await eslint.lintText(code, { filePath });

  // ESLint should always return one result for lintText. Keeping this assertion
  // makes failures clearer if construction or config resolution changes.
  assert.ok(result, `expected a lint result for ${filePath}`);

  // The sample files must be linted, not silently ignored. This catches overly
  // broad ignores or file-pattern mistakes in the exported flat configs.
  assert.equal(
    result.messages.some((message) => /File ignored/.test(message.message)),
    false,
    `${filePath} should not be ignored`,
  );

  // The callers only need rule ids, not full ESLint message objects. Returning
  // ids keeps behavior assertions stable across message wording changes.
  return result.messages.map((message) => message.ruleId);
}

/**
 * Exercises representative lint behavior for each public preset.
 *
 * This is not a full rule snapshot; it checks that the key plugin families are
 * wired, scoped to the expected file extensions, and capable of producing
 * diagnostics.
 *
 * @returns {Promise<void>}
 */
async function assertLintBehavior() {
  // Plain JavaScript should be linted by the base preset using ESLint's core
  // recommended no-unused-vars rule.
  assert.deepEqual(
    await lint(base, "const unused = 1;\n", "sample.js"),
    ["no-unused-vars"],
    "base should lint JavaScript files",
  );

  // TypeScript files should switch to the @typescript-eslint rule family so the
  // TypeScript parser and plugin are both proven to load correctly.
  assert.ok(
    (await lint(base, "const unused: number = 1;\n", "sample.ts")).includes("@typescript-eslint/no-unused-vars"),
    "base should lint TypeScript files",
  );

  // JSX files should activate the React Hooks plugin through the React preset.
  // The intentionally invalid hook call is a compact signal that the plugin is
  // registered and that JSX files are included by the preset.
  assert.ok(
    (
      await lint(
        react,
        "import { useState } from 'react';\nexport function App() { if (true) { useState(); } return <div />; }\n",
        "sample.jsx",
      )
    ).includes("react-hooks/rules-of-hooks"),
    "react should lint JSX files",
  );

  // TSX files need both React support and TypeScript support. This assertion
  // guards against changes that accidentally handle JSX but drop TypeScript
  // linting inside React components.
  assert.ok(
    (
      await lint(
        react,
        "type Props = { name: string };\nconst unused: Props = { name: 'taeyoon' };\nexport function App() { return <div />; }\n",
        "sample.tsx",
      )
    ).includes("@typescript-eslint/no-unused-vars"),
    "react should lint TSX files",
  );
}

/**
 * Validates the package tarball contents using npm's own dry-run pack output.
 *
 * This protects the published artifact, which can differ from the working tree
 * when package.json "files", .npmignore, or generated dist files change.
 *
 * @returns {void}
 */
function assertPackDryRun() {
  // --json gives a stable machine-readable file list without creating a .tgz.
  const output = execFileSync("npm", ["pack", "--dry-run", "--json"], { encoding: "utf8" });
  const [{ files }] = JSON.parse(output);
  const paths = files.map((file) => file.path);

  // The package entrypoints in package.json resolve to these built files, so the
  // tarball must include them even though dist is generated and git-ignored.
  assert.ok(paths.includes("dist/configs/base.js"), "package should include the base build");
  assert.ok(paths.includes("dist/configs/react.js"), "package should include the react build");
  assert.ok(paths.includes("dist/configs/react-native.js"), "package should include the react-native build");

  // AGENTS.md is part of the package contract, not just repository documentation.
  // The README prompt asks downstream agents to install this package and then read
  // node_modules/eslint-config-taeyoon/AGENTS.md before wiring the preset into the
  // consuming project. Keep this pack check so changes to package.json "files" do
  // not accidentally drop those install-time instructions from the published tarball.
  assert.ok(paths.includes("AGENTS.md"), "package should include the agent instructions");

  // The license is expected in the distributed package for consumers and package
  // registry metadata, so keep it covered alongside the executable artifacts.
  assert.ok(paths.includes("LICENSE"), "package should include the license");
}

/**
 * Runs the smoke checks in dependency order.
 *
 * Each helper throws assertion errors directly, and the package script surfaces
 * the first failing package contract.
 *
 * @returns {Promise<void>}
 */
(async () => {
  // Start with module-loading and export-shape checks. Later lint assertions
  // depend on these imports being valid.
  assertConfigExports();

  // Keep the published peer dependency metadata aligned with the base preset,
  // which loads the TypeScript parser and plugin for TypeScript file patterns.
  assertPeerDependencies();

  // Then run ESLint itself so parser, plugin, and file-extension behavior are
  // validated through the same public configs that consumers import.
  await assertLintBehavior();

  // Finally check the publish artifact after build output has been produced by
  // the parent yarn test script.
  assertPackDryRun();
})();
