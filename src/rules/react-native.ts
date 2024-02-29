/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Level } from '@/types';

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - React Native
 *
 * Rule for React Native
 */
const eslintRuleReactNative: Linter.Config = {
  plugins: ['react-native'],
  rules: {
    'react-native/no-inline-styles': Level.Off,
  },
};

// Export to module
module.exports = eslintRuleReactNative;
