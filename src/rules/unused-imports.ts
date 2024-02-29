/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Level } from '@/types';

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - Unused Imports
 *
 * Rule for Unused Imports
 */
const eslintRuleUnusedImports: Linter.Config = {
  plugins: ['unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': Level.Warn,
  },
};

// Export to module
module.exports = eslintRuleUnusedImports;
