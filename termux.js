const { startServer } = require('termux-appium');
const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 4884;
(async function main () {
    console.log('starting server....');
  return await startServer(DEFAULT_PORT, DEFAULT_HOST);
})();

const wd = require('wd');

var browser = new wd.promiseChainRemote({
    host: 'localhost',
    port: 4884
});

const defaultCaps = {
    deviceName: 'Termux',
    platformName: 'Android',
    newCommandTimeout: 1800,
    appPackage: 'com.instagram.android',
    appActivity: 'com.instagram.android.activity.MainTabActivity'
};

(async function runTest() {
    console.log("running runTest...");
    await browser.init(defaultCaps);
    await browser.sleep(5000);
    await browser.waitForElementById("com.instagram.android:id/log_in_button", 1000).click();
    await browser.quit();

})()