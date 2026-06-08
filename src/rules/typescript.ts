/**
 * Copyright 2024 Taeyoon Lee. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

import { Level } from '@/types';

import type { ESLint, Linter } from 'eslint';

const TS_FILES = ['**/*.{ts,tsx,mts,cts}'];

/**
 * ### Eslint Rule - Typescript
 *
 * Rule for Typescript
 */
const eslintRuleTypescript: Linter.Config[] = [
  {
    files: TS_FILES,
    languageOptions: {
      parser: typescriptParser as Linter.Parser,
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin as unknown as ESLint.Plugin,
    },
  },
  ...(typescriptPlugin.configs['flat/recommended'] as Linter.Config[]).map((config) => ({
    ...config,
    files: TS_FILES,
  })),
  {
    files: TS_FILES,
    rules: {
      'no-unused-vars': Level.Off,
      '@typescript-eslint/no-unused-vars': [Level.Error, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  },
];

// Export to module
export default eslintRuleTypescript;
module.exports = eslintRuleTypescript;
