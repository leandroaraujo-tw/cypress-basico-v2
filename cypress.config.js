const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "4oj4io",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
