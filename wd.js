// Requires the admc/wd client library
// (npm install wd)
// Then paste this into a .js file and run with Node 7.6+

const wd = require('wd');
const driver = wd.promiseChainRemote("http://localhost:4884/wd/hub")
const caps = {"platformName":"Android","platformVersion":"10.0","deviceName":"Pixel 2","appPackage":"com.instagram.android","appActivity":".activity.MainTabActivity","automationName":"UiAutomator2"};

async function main () {
  await driver.init(caps);
  let el1 = await driver.elementById("com.instagram.android:id/row_feed_photo_profile_name");
  await el1.click();
  await (new wd.TouchAction(driver))
    .press({x: 1045, y: 1071})
    .moveTo({x: 877, y: 292})
    .release()
    .perform()
  let el2 = await driver.elementByAccessibilityId("2 photos and 1 video by EVEY & BRET - TRAVEL at Row 1, Column 1");
  await el2.click();
  let el3 = await driver.elementByAccessibilityId("Like");
  await el3.click();
  let el4 = await driver.elementById("com.instagram.android:id/row_feed_textview_likes");
  await el4.click();
  let el5 = await driver.elementByXPath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.widget.ListView/android.widget.FrameLayout[1]/android.widget.LinearLayout");
  await el5.click();
  let el6 = await driver.elementByAccessibilityId("Back");
  await el6.click();
  let els1 = await driver.elementsByClassName("android.widget.LinearLayout");
  await driver.quit();
}

main().catch(console.log);
