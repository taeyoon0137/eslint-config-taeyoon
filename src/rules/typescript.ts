/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - Typescript
 *
 * Rule for Typescript
 */
const eslintRuleTypescript: Linter.Config = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['tsconfig.json'],
};

// Export to module
module.exports = eslintRuleTypescript;
