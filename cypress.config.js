const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    // Aktifkan reporter "spec" (output ke terminal) & Qase
    reporterEnabled: 'spec, cypress-qase-reporter',

    // Opsi untuk cypress-qase-reporter
    cypressQaseReporterReporterOptions: {
      debug: true,
      logging: true,

      // ⚠️ Untuk testops mode, letakkan token di testops.api.token
      testops: {
        api: {
          token: 'b50c9083df59942a72ff28f33fe9e334add0488408e938b0606b50f206578f09'
        },
        project: 'CIWQI',
        uploadAttachments: true,
        run: {
          complete: true
        }
      }
    }
  },

  e2e: {
    setupNodeEvents(on, config) {
      // Hook plugin & metadata Qase untuk TestOps
      require('cypress-qase-reporter/plugin')(on, config);
      require('cypress-qase-reporter/metadata')(on);
    },
    baseUrl: 'https://soapleasure.com/',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    watchForFileChanges: false,
  },
});



