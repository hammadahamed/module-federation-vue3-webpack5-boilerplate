// https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption
import("./bootstrap").catch((err) =>
  console.error("Error bootstrapping app:", err)
);
