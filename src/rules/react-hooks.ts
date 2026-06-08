/**
 * Copyright 2024 Taeyoon Lee. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Level } from '@/types';

import reactHooksPlugin from 'eslint-plugin-react-hooks';

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - React
 *
 * Rule for React
 */
const eslintRuleReact: Linter.Config = {
  ...(reactHooksPlugin.configs.flat.recommended as Linter.Config),
  files: ['**/*.{jsx,tsx}'],
  rules: {
    ...(reactHooksPlugin.configs.flat.recommended as Linter.Config).rules,
    // Allow to select deps for useEffect and useCallback
    'react-hooks/exhaustive-deps': Level.Off,
  },
};

// Export to module
export default eslintRuleReact;
module.exports = eslintRuleReact;
