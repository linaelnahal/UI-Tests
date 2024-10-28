module.exports = {
  src_folders: ['./tests'], // Path to your tests folder
  page_objects_path: './pages',
  webdriver: {
    start_process: true,
    server_path: require('chromedriver').path, // Ensure this points to ChromeDriver
    port: 9515, // Default port for ChromeDriver
  },
  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome', // Use 'chrome' for ChromeDriver
      },
    },
  },
};
