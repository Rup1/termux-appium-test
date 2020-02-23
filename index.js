const wdio = require("webdriverio");
const { startServer } = require('termux-appium');
const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 4884;
const opts = {
  port: 4884,
  capabilities: {
    platformName: "Android",
    platformVersion: "10.0",
    deviceName: "Termux",
    appPackage: "com.instagram.android",
    appActivity: ".activity.MainTabActivity",
    automationName: "UiAutomator2"
  }
};
(async function main () {
  return await startServer(DEFAULT_PORT, DEFAULT_HOST);
})();

const userSelectors = (userName) => {
  return {
    userAccountEmail: `//android.widget.LinearLayout[@content-desc="rupenderfox@gmail.com"]/android.widget.LinearLayout`,
    feedPhotoProfileName: {
      id: `com.instagram.android:id/row_feed_photo_profile_name`,
      xPath: `${ANDROID_UI}/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout[2]/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.LinearLayout/android.widget.TextView`,
      class: `android.widget.TextView`,
      resourceId: `com.instagram.android:id/row_feed_photo_profile_name`,
      elementId: `bd3b24e8-c0a2-4e44-9f50-3bc99897db12`
    },
    exploreButton: {
      xPath: `//android.widget.FrameLayout[@content-desc="Search and Explore"]/android.widget.ImageView`,
      class: `android.widget.ImageView`,
      resourceId: `com.instagram.android:id/tab_icon`,
      bounds: [292, 2059][(355, 2122)]
    },

    exploreSearchBar: {
      id: `com.instagram.android:id/action_bar_search_edit_text`,
      xPath: `${ANDROID_UI}/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.EditText`,
      resourceId: `	com.instagram.android:id/action_bar_search_edit_text`
    },

    searchResult: {
      xPath: `${ANDROID_UI}/android.widget.FrameLayout[1]/android.widget.FrameLayout/androidx.viewpager.widget.ViewPager/android.widget.FrameLayout/android.widget.ListView/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]`,
      class: `android.widget.TextView`,
      resourceId: `com.instagram.android:id/row_search_user_username`
    },

    userFullName: {
      id: `com.instagram.android:id/profile_header_full_name`,
      xPath: `${ANDROID_UI}/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.view.ViewGroup/android.widget.TextView[1]`,
      resourceId: `com.instagram.android:id/profile_header_full_name`,
      class: `android.widget.TextView`
    },

    followerCount: {
      id: `com.instagram.android:id/row_profile_header_textview_followers_count`,
      xPath: `${ANDROID_UI}/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.LinearLayout[2]/android.widget.TextView[1]`,
      resourceId: `com.instagram.android:id/row_profile_header_textview_followers_count`,
      class: `android.widget.TextView`
    },

    followingCount: {
      id: `com.instagram.android:id/row_profile_header_textview_following_count`,
      xPath: `${ANDROID_UI}/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.view.ViewGroup/android.view.ViewGroup[2]/android.widget.LinearLayout[3]/android.widget.TextView[1]`,
      resourceId: `com.instagram.android:id/row_profile_header_textview_following_count`,
      class: `android.widget.TextView`
    },

    firstFeedPhoto: {
      accessibilityId: `${userName}; at Row 1, Column 1`,
      xPath: `//android.widget.ImageView[@content-desc="${userName}; at Row 1, Column 1"]`,
      class: `android.widget.ImageView`,
      contentDesc: `${userName}; at Row 1, Column 1`
    },

    likeButton: {
      id: `com.instagram.android:id/row_feed_button_like`,
      xPath: `//android.widget.ImageView[@content-desc="Like"][1]`,
      elementId: `4eeca97f-5bff-437a-b7c3-d42462aa2393`,
      contentDesc: `Like`,
      resourceId: `com.instagram.android:id/row_feed_button_like`
    }
  };
};

async function main () {
  const driver = await wdio.remote(opts);
  const find = (locator, el) => {
    if(locator === "xpath") {
      return driver.$(el);
    }else{
      return driver.$(`android=new UiSelector().${locator}("${el}")`)
    }
  };

  const click = async (locator, el) => {
    const theEl = await find(locator, el);
    return theEl.click();
  };

  driver.setImplicitTimeout(5000);
  const user = userSelectors(`Photo by Jon Ellman | Front-End Dev #128187`);

  await click("xpath", user.userAccountEmail);
  await click("resourceId", user.feedPhotoProfileName.resourceId);
}

main();




















// const profile_name2 = await driver.findElement(`id`, `com.instagram.android:id/row_feed_photo_profile_name`);
  // const profile_name_text2 = await driver.getElementText(profile_name2);
  // console.log('PROFILE NAME TEXT: ', profile_name_text2)
  // await driver.elementClick(profile_name2);


// async function main () {
//   const driver = await wdio.remote(opts);
//   const myEmail = await driver.$(`//android.widget.LinearLayout[@content-desc="rupenderfox@gmail.com"]/android.widget.LinearLayout`);
//   const visible = await myEmail.getText();
//   console.log("TEXT", visible);
//   await myEmail.click();
//   await driver.pause(8000);
//   const profile_name = await driver.$(`/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.ListView/android.widget.LinearLayout[2]/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.LinearLayout/android.widget.LinearLayout[1]/android.widget.LinearLayout/android.widget.TextView`);
//   const profile_name_text = await profile_name.getText();
//   console.log('PROFILE NAME TEXT: ', profile_name_text)
//   await profile_name.click();
// }

// main();



// // click on profile name
// `com.instagram.android:id/row_feed_photo_profile_name`

// //click on latest post
// `//android.widget.ImageView`
// `android.widget.ImageView[@content-desc="2 photos and 1 video by Davis & Sydney | Travel Couple at Row 1, Column 1"]`

// // click on photo likes
// `com.instagram.android:id/row_feed_textview_likes`

// // get username text from list of likers
// `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.widget.ListView/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView[1]`

// // get username text from list of likers parent element
// `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]/android.widget.FrameLayout[1]/android.widget.FrameLayout/android.widget.ListView/android.widget.FrameLayout[1]/android.widget.LinearLayout
// `

// // const Page = async function() {
// //   var driver = await new webdriver.Builder().withCapabilities({
// //     browserName: '',
// //     platformName: "Android",
// //     platformVersion: "10.0",
// //     deviceName: "Pixel 2",
// //     appPackage: "com.instagram.android",
// //     appActivity: ".activity.MainTabActivity",
// //     automationName: "UiAutomator2"
// //   }).usingServer("http://localhost:4723/wd/hub").build();

// //   var elements = await driver.findElement(by.xpath('//android.widget.LinearLayout[@content-desc="rupenderfox@gmail.com"]/android.widget.LinearLayout'));
// //   console.log('elements', elements);
// //   await elements.click();
// // }

// // Page();

// const profile_name = await driver.element("com.instagram.android:id/row_feed_photo_profile_name")
// await profile_name.click()
//   .element("~2 photos and 1 video by Davis & Sydney | Travel Couple at Row 1, Column 1")
//   .click()
//   .element("com.instagram.android:id/row_feed_textview_likes")
//   .click()
//   .touchAction([
//     {action: 'press', x: 489, y: 1853},
//     {action: 'moveTo', x: 555, y: 887},
//     'release'
//   ])
//   .touchAction([
//     {action: 'press', x: 453, y: 925},
//     {action: 'moveTo', x: 464, y: 470},
//     'release'
//   ])
//   .touchAction([
//     {action: 'press', x: 417, y: 1837},
//     {action: 'moveTo', x: 425, y: 483},
//     'release'
//   ])
//   .touchAction([
//     {action: 'press', x: 478, y: 285},
//     {action: 'moveTo', x: 492, y: 1914},
//     'release'
//   ])
//   .touchAction([
//     {action: 'press', x: 514, y: 298},
//     {action: 'moveTo', x: 555, y: 1942},
//     'release'
//   ])
//   .touchAction({actions: 'tap', x: 287, y: 997})
//   .touchAction({actions: 'tap', x: null, y: null})
//   .touchAction({actions: 'tap', x: null, y: null})
//   .touchAction({actions: 'tap', x: null, y: null})
//   .touchAction({actions: 'tap', x: 44, y: 224})
//   .element("//android.widget.FrameLayout[@content-desc=\"Home\"]/android.widget.ImageView")
//   .click()
//   .touchAction({actions: 'tap', x: 431, y: 539})
//   .end();
