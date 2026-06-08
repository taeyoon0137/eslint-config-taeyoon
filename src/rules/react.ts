/**
 * Copyright 2024 Taeyoon Lee. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import reactPlugin from 'eslint-plugin-react';

import type { Linter } from 'eslint';

/**
 * ### Eslint Rule - React
 *
 * Rule for React
 */
const eslintRuleReact: Linter.Config = {
  ...(reactPlugin.configs.flat['jsx-runtime'] as Linter.Config),
  files: ['**/*.{jsx,tsx}'],
};

// Export to module
export default eslintRuleReact;
module.exports = eslintRuleReact;
