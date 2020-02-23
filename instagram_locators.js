const ANDROID_UI = `/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout[2]`;
const exampleUser = `Photo by Jon Ellman | Front-End Dev #128187`;

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

module.exports = userSelectors;
