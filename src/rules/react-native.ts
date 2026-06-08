/**
 * Copyright 2024 Taeyoon Lee. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Level } from '@/types';

import reactNativePlugin from 'eslint-plugin-react-native';

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - React Native
 *
 * Rule for React Native
 */
const eslintRuleReactNative: Linter.Config = {
  files: ['**/*.{jsx,tsx}'],
  plugins: {
    'react-native': reactNativePlugin,
  },
  rules: {
    'react-native/no-inline-styles': Level.Off,
  },
};

// Export to module
export default eslintRuleReactNative;
module.exports = eslintRuleReactNative;
