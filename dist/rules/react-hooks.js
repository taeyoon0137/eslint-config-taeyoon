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
 * ### Eslint Rule - React
 *
 * Rule for React
 */
const eslintRuleReact = {
    plugins: ['react-hooks'],
    rules: {
        // Allow to select deps for useEffect and useCallback
        'react-hooks/exhaustive-deps': types_1.Level.Off,
    },
};
// Export to module
module.exports = eslintRuleReact;
//# sourceMappingURL=react-hooks.js.map