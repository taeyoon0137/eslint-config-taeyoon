"use strict";
/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ### Internal Rule Extends
 *
 * Internal Rules to extend
 */
const internalExtends = ['recommended', 'typescript', 'import', 'unused-imports', 'prettier'].map((key) => require.resolve(`../rules/${key}`));
/**
 * ### Eslint Config
 *
 * Pre-defined .eslintrc for Whatssub Co., Ltd.
 */
const eslintConfig = {
    extends: [...internalExtends],
};
// Export to module
module.exports = eslintConfig;
//# sourceMappingURL=base.js.map