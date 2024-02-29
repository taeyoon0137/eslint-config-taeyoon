"use strict";
/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
/**
 * ### Eslint Rule - Unused Imports
 *
 * Rule for Unused Imports
 */
const eslintRuleUnusedImports = {
    plugins: ['unused-imports'],
    rules: {
        'unused-imports/no-unused-imports': types_1.Level.Warn,
    },
};
// Export to module
module.exports = eslintRuleUnusedImports;
//# sourceMappingURL=unused-imports.js.map