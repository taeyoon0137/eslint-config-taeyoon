/**
 * Copyright 2024 Taeyoon Lee. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import base from "./base";
import prettier from "../rules/prettier";
import react from "../rules/react";
import reactHooks from "../rules/react-hooks";

import type { Linter } from "eslint";

/**
 * ### Internal Configs
 *
 * Internal configs to compose
 */
/**
 * ### Eslint Config
 *
 * Pre-defined ESLint flat config for Taeyoon Lee's React projects.
 */
const eslintConfig: Linter.Config[] = [...base, react, reactHooks, prettier];

// Export to module
export default eslintConfig;
module.exports = eslintConfig;
