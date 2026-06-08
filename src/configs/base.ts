/**
 * Copyright 2024 Taeyoon Lee. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import importRule from "../rules/import";
import prettier from "../rules/prettier";
import recommended from "../rules/recommended";
import typescript from "../rules/typescript";
import unusedImports from "../rules/unused-imports";

import type { Linter } from "eslint";

/**
 * ### Internal Configs
 *
 * Internal configs to compose
 */
/**
 * ### Eslint Config
 *
 * Pre-defined ESLint flat config for Taeyoon Lee's projects.
 */
const eslintConfig: Linter.Config[] = [recommended, ...typescript, importRule, unusedImports, prettier];

// Export to module
export default eslintConfig;
module.exports = eslintConfig;
