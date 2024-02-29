/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - Prettier
 *
 * Rule for Prettier
 */
const eslintRulePrettier: Linter.Config = {
  extends: ['prettier'],
};

// Export to module
module.exports = eslintRulePrettier;
