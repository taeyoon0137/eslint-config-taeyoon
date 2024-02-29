/**
 * Copyright 2023 Whatssub Co., Ltd. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Linter } from 'eslint';

/**
 * ### Internal Rule Extends
 *
 * Internal Rules to extend
 */
const internalExtends = ['./configs/base'].map((key) => require.resolve(key));

/**
 * ### Eslint Config
 *
 * Pre-defined .eslintrc for Whatssub Co., Ltd.
 */
const eslintConfig: Linter.Config = {
  extends: [...internalExtends],
  root: true,
  ignorePatterns: ['node_modules/*'],
};

// Export to module
module.exports = eslintConfig;
