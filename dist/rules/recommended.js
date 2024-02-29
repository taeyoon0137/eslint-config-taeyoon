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
 * ### Eslint Rule - Eslint Recommended
 *
 * Rule for Eslint Recommended
 */
const eslintRuleRecommended = {
    extends: ['eslint:recommended'],
    rules: {
        curly: types_1.Level.Off,
        'no-case-declarations': types_1.Level.Off,
        'no-redeclare': types_1.Level.Off,
        'no-undef': types_1.Level.Off,
        'no-unused-vars': [types_1.Level.Error, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
        'nonblock-statement-body-position': types_1.Level.Error,
        'prefer-const': types_1.Level.Error,
        'no-import-assign': types_1.Level.Off,
        quotes: types_1.Level.Off,
    },
};
// Export to module
module.exports = eslintRuleRecommended;
//# sourceMappingURL=recommended.js.map