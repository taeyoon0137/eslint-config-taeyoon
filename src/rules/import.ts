/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Level } from "@/types";

import type { Linter } from "eslint";

/**
 * ### Default Libraries
 *
 * Default Libraries to import above
 */
const DEFAULT_LIBRARIES: string = [
  "react",
  "react-dom",
  "react-router-dom",
  "react-native",
  "react-native-reanimated",
  "recoil",
  "react-query",
  "next?(/*)",
  "zod",
  "lodash",
  "axios",
  "superagent",
].join(",");

/**
 * ### Eslint Rule - Import
 *
 * Rule for Import
 */
const eslintRuleImport: Linter.Config = {
  plugins: ["import"],
  rules: {
    "import/order": [
      Level.Error,
      {
        groups: ["builtin", "external", "sibling", "parent", "internal", "object", "index", "type"],
        pathGroups: [
          {
            pattern: "*.{css,scss,sass}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: `{${DEFAULT_LIBRARIES}}`,
            group: "builtin",
            position: "before",
          },
          {
            pattern: "react-!(native+(*))",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "{react-native-*,*-react-native}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "{@/*, @*, @/**/*, @**/*}",
            group: "external",
            position: "after",
          },
        ],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["type"],
        alphabetize: {
          order: "asc",
          orderImportKind: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};

// Export to module
module.exports = eslintRuleImport;
