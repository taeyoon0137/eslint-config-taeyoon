/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Level } from '@/types';

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - Eslint Recommended
 *
 * Rule for Eslint Recommended
 */
const eslintRuleRecommended: Linter.Config = {
  extends: ['eslint:recommended'],
  rules: {
    curly: Level.Off,
    'no-case-declarations': Level.Off,
    'no-redeclare': Level.Off,
    'no-undef': Level.Off,
    'no-unused-vars': [Level.Error, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'nonblock-statement-body-position': Level.Error,
    'prefer-const': Level.Error,
    'no-import-assign': Level.Off,
    quotes: Level.Off,
  },
};

// Export to module
module.exports = eslintRuleRecommended;
