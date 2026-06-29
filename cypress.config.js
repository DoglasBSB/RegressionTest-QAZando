const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'g1yfk7',
  // Disabled to allow navigation between pages with different origins (e.g. payment redirects)
  chromeWebSecurity: false,
  viewportWidth: 1360,
  viewportHeight: 900,
  e2e: {
    defaultCommandTimeout: 10000,
    baseUrl: 'https://automationpratice.com.br/',
    setupNodeEvents(_on, _config) {},
  },
})