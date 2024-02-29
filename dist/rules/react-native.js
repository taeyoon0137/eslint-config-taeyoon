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
 * ### Eslint Rule - React Native
 *
 * Rule for React Native
 */
const eslintRuleReactNative = {
    plugins: ['react-native'],
    rules: {
        'react-native/no-inline-styles': types_1.Level.Off,
    },
};
// Export to module
module.exports = eslintRuleReactNative;
//# sourceMappingURL=react-native.js.map