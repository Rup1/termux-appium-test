const wdio = require('webdriverio');
const accounts = require('./userList');
const fs = require('fs');
const opts = {
  port: 4723,
  capabilities: {
    deviceName: 'iPhone',
    platformVersion: '13.3.1',
    platformName: 'iOS',
    udid: '3f6072976c263e71c67a840422f027295aecb5e5',
    app: 'com.burbn.instagram',
    automationName: 'XCUITest',
    noReset: true
  }
};

const selector = {
  searchBar: '//XCUIElementTypeNavigationBar[@name="navigation-bar"]/XCUIElementTypeStaticText/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTextField'
}

async function main() {
  const driver = await wdio.remote(opts);
  driver.setImplicitTimeout(5000);
  const searchBar = selector.searchBar;

  const find = el => {
    return driver.$$(el);
  };

  const storeUsers = (fileName, userList) => {
    fs.readFile(__dirname + fileName, { encoding: 'utf-8' }, function(
      err,
      data
    ) {
      var json = JSON.parse(data);
      var userSet = new Set(userList.map(user => user.user));
      var finalArray = [
        ...userList,
        ...json.filter(user => !userSet.has(user.user))
      ];
      // console.log('FINAL ARRAY IS: ', finalArray, finalArray.length);
      fs.writeFile(
        __dirname + fileName,
        JSON.stringify(finalArray, null, 2),
        () => {}
      );
    });
  };

  const click = async (El, requested) => {
    await find(El).then(el => {
      if (el.length > 0) {
        if (requested) {
          console.log('requested condition detected...');
          let domProperty = {
            text: el[0].getText(), //"Following" text
            attribute: el[0].getAttribute(requested.value).catch() // "following"
          };
          if (requested && requested.property === 'text') {
            console.log(
              'TEXT REQUESTED....',
              domProperty[requested.property] === requested.value
            );
            return domProperty[requested.property] === requested.value
              ? null
              : el[0].click().catch();
          } else if (requested && requested.property === 'attribute') {
            console.log(
              'ATTRIZBUTE REQUESTED',
              domProperty[requested.property],
              requested.condition
            );
            return domProperty[requested.property] === requested.condition
              ? null
              : el[0].click().catch();
          }
        } else {
          return el[0].click().catch();
        }
      } else {
        console.log('no element found');
      }
    });
  };

  const type = async (el, keys) => {
    const input = await find(el);
    return input[0].setValue(keys).catch();
  };

  const read = async el => {
    const text = await find(el);
    console.log(text);
    return text.getText();
  };

  const wait = ms => {
    return driver.pause(ms);
  };

  const randomSleep = async (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const waitTime = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`RANDOM SLEEP: ${waitTime} milliseconds`);
    return wait(waitTime);
  };

  const randomLike = async () => {
    const shouldLike = Math.floor(Math.random() * 2);
    if (shouldLike) {
      await click(
        `(//XCUIElementTypeImage[@name="media-thumbnail-cell"])[${Math.floor(
          Math.random() * 4
        ) + 1}]`
      );
      await click('~like-button');
    }
  };

  const randomScroll = async () => {
    const shouldScroll = Math.floor(Math.random() * 2);
    if (shouldScroll) {
      for (i = 0; i < Math.ceil(Math.random() * 4); i++) {
        let scrollDirection = Math.floor(Math.random() * 2);
        await driver.execute('mobile: swipe', {
          direction: 'down'
        })
        await randomSleep(1000, 3050);
        console.log('DIRECTION: ', scrollDirection);
        return driver.execute('mobile: swipe', {
          direction: scrollDirection ? 'up' : 'down'
        });
      }
    }
  };

  for (i = 0; i < accounts.length; i++) {
    let users = accounts
    if (users[i].engaged === true) {
      console.log(`User ${users[i].profileName} already engaged, moving on...`);
    } else {
      await click('~explore-tab');
      await type(searchBar, users[i].profileName + ` `);
      await randomSleep(1000, 2650)
      const isFollowing = await find(`~${users[i].profileName}`);
      await randomSleep(1000, 2650)
      console.log("FOLLOWING", isFollowing);
      const alreadyFollowed = isFollowing !== [] ? await isFollowing[0].getAttribute('value').catch() : false;
      await randomSleep(1000, 2500).then(() => {
        console.log("Already followed? ", alreadyFollowed);
      });
      const isAlreadyFollowed = alreadyFollowed ? alreadyFollowed.includes('Following') || alreadyFollowed.includes('new') : false;
      await randomSleep(1000, 2650)
      !isAlreadyFollowed && await click(`~${users[i].profileName}`);
      if(!isAlreadyFollowed) {
        if (users[i].action === 'like') {
          await click(
            `(//XCUIElementTypeButton[@name="media-thumbnail-cell"])[${Math.floor(
              Math.random() * 4
            ) + 1}]`
          );
          await randomSleep(2000, 15000);
          await click('~like-button');
          users[i].engaged = true;
          storeUsers('/userList.json', users);
          await randomSleep(2000, 6000);
        } else if (users[i].action === 'follow') {
          await find("~This Account is Private").then(async(el)=> {
            if(el.length > 0){
              users[i].private = true;
              users[i].engaged = true
              storeUsers('/userList.json', users);
            } else {
              await click('~user-detail-header-follow-button', {
                property: 'attribute',
                value: 'label',
                condition: 'Following'
              });
              users[i].engaged = true;
              storeUsers('/userList.json', users);
              await randomScroll();
              await randomLike();
              await randomSleep(4000, 27000);
            }
          })
        }
      } else {
        users[i].engaged = true;
        console.log(`Already following user: ${users[i].profileName}`)
      }
    }
  }

  // await click("~explore-tab");
  // await type(searchBar, "nycdev•");
  // await click("~nycdev");
  // await read("~user-detail-header-followers");
  // await click("~user-detail-header-media-button");
  // await click("(//XCUIElementTypeImage[@name=\"media-thumbnail-cell\"])[1]");
  // await click("~like-button");
  // await wait(3000);
}
main();

