module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    quotes: ["error", "double"],
    "linebreak-style": 0,
    "no-console": "off",
    "no-useless-escape": "off",
    "consistent-return": "off",
  },
};
