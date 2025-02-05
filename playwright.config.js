const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 30 * 1000, // Default timeout
  retries: 0,  // 👈 Ensures tests do not retry after failure
  reporter: 'html',
  workers: 1,
  use: {
    // headless: false,
    browserName: 'chromium', // Use 'firefox' or 'webkit' if needed
  },
};

module.exports = config;
