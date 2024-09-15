// const tailwindcss = require('tailwindcss');
// const wrapSelector = (opts = {}) => ({
//   postcssPlugin: "wrap-selector",
//   Once(root) {
//     root.walkRules((rule) => {
//       if (!rule.selectors) return rule;
//       rule.selectors = rule.selectors.map(
//         (selector) => `${opts.wrapper} ${selector}`
//       );
//     });
//   },
// });
// wrapSelector.postcss = true;

// module.exports = {
//   plugins: ["postcss-preset-env", wrapSelector({ wrapper: "#app1-id" })],
// };

// module.exports = {
//   plugins: {
//     "postcss-import": {},
//     autoprefixer: {},
//   },
// };
