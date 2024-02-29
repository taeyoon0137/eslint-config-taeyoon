/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Linter } from 'eslint';

/**
 * ### Internal Rule Extends
 *
 * Internal Rules to extend
 */
const internalExtends = ['react', 'react-hooks', 'prettier'].map((key) => require.resolve(`../rules/${key}`));

/**
 * ### Eslint Config
 *
 * Pre-defined .eslintrc for Whatssub Co., Ltd.
 */
const eslintConfig: Linter.Config = {
  extends: [...internalExtends],
};

// Export to module
module.exports = eslintConfig;
