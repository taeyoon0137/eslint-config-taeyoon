const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");

const { ESLint } = require("eslint");

const base = require("eslint-config-taeyoon/base");
const react = require("eslint-config-taeyoon/react");
const reactNative = require("eslint-config-taeyoon/react-native");
const prettier = require("eslint-config-taeyoon/prettier");

function assertConfigExports() {
  assert.ok(Array.isArray(base), "base export should be a config array");
  assert.ok(Array.isArray(react), "react export should be a config array");
  assert.ok(Array.isArray(reactNative), "react-native export should be a config array");
  assert.equal(typeof prettier, "object", "prettier export should be an object");

  const importPlugin = base.find((config) => config.plugins?.import)?.plugins.import;
  assert.equal(typeof importPlugin, "object", "import plugin should be a plugin object");
  assert.equal(typeof importPlugin.rules, "object", "import plugin should expose rules");

  assert.ok(react.some((config) => config.plugins?.["@typescript-eslint"]), "react preset should include base rules");
  assert.ok(reactNative.some((config) => config.plugins?.react), "react-native preset should include react rules");
}

async function lint(config, code, filePath) {
  const eslint = new ESLint({ overrideConfigFile: true, overrideConfig: config });
  const [result] = await eslint.lintText(code, { filePath });

  assert.ok(result, `expected a lint result for ${filePath}`);
  assert.equal(
    result.messages.some((message) => /File ignored/.test(message.message)),
    false,
    `${filePath} should not be ignored`,
  );

  return result.messages.map((message) => message.ruleId);
}

async function assertLintBehavior() {
  assert.deepEqual(
    await lint(base, "const unused = 1;\n", "sample.js"),
    ["no-unused-vars"],
    "base should lint JavaScript files",
  );

  assert.ok(
    (await lint(base, "const unused: number = 1;\n", "sample.ts")).includes("@typescript-eslint/no-unused-vars"),
    "base should lint TypeScript files",
  );

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

function assertPackDryRun() {
  const output = execFileSync("npm", ["pack", "--dry-run", "--json"], { encoding: "utf8" });
  const [{ files }] = JSON.parse(output);
  const paths = files.map((file) => file.path);

  assert.ok(paths.includes("dist/configs/base.js"), "package should include the base build");
  assert.ok(paths.includes("dist/configs/react.js"), "package should include the react build");
  assert.ok(paths.includes("dist/configs/react-native.js"), "package should include the react-native build");
  assert.ok(paths.includes("LICENSE"), "package should include the license");
}

(async () => {
  assertConfigExports();
