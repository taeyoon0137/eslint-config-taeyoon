/**
 * Copyright 2024 Taeyoon Lee. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Level } from '@/types';

import unusedImportsPlugin from 'eslint-plugin-unused-imports';

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - Unused Imports
 *
 * Rule for Unused Imports
 */
const eslintRuleUnusedImports: Linter.Config = {
  files: ['**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'],
  plugins: {
    'unused-imports': unusedImportsPlugin,
  },
  rules: {
    'unused-imports/no-unused-imports': Level.Warn,
  },
};

// Export to module
export default eslintRuleUnusedImports;
module.exports = eslintRuleUnusedImports;
