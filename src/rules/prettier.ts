/**
 * Copyright 2024 Taeyoon Lee. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import prettierConfig from 'eslint-config-prettier';

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - Prettier
 *
 * Rule for Prettier
 */
const eslintRulePrettier: Linter.Config = prettierConfig;

// Export to module
export default eslintRulePrettier;
module.exports = eslintRulePrettier;
