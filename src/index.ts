/**
 * Copyright 2024 Taeyoon Lee. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import base from './configs/base';

import type { Linter } from 'eslint';

/**
 * ### Internal Configs
 *
 * Internal configs to compose
 */
/**
 * ### Eslint Config
 *
 * Pre-defined ESLint flat config for Taeyoon Lee's projects.
 */
const eslintConfig: Linter.Config[] = [
  {
    ignores: ['node_modules/*'],
  },
  ...base,
];

// Export to module
export default eslintConfig;
module.exports = eslintConfig;
