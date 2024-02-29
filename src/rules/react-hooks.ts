/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Level } from '@/types';

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - React
 *
 * Rule for React
 */
const eslintRuleReact: Linter.Config = {
  plugins: ['react-hooks'],
  rules: {
    // Allow to select deps for useEffect and useCallback
    'react-hooks/exhaustive-deps': Level.Off,
  },
};

// Export to module
module.exports = eslintRuleReact;
