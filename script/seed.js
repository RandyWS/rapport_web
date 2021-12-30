"use strict";
const {
  db,
  models: { User, Friend, Communication, Recurring_Pattern, Recurring_Type },
} = require("../server/db");
const moment = require("moment");
const { green, red } = require("chalk");

const randy = {
  firstName: "Randy",
  lastName: "Stopa",
  email: "r@r.com",
  password: "password",
  imageUrl: "https://i.imgur.com/lcZJfH2.jpg",
};

const randyFriends = [
  {
    firstName: "Lauren",
    lastName: "Distler",
    description:
      "Really amazing friend from college! We were on the debate team together and attended the London School of Economics together for a year. Works for a refugee organization in London. She likes reading, theater, cats, and travelling.",
    imageUrl: "https://i.imgur.com/dLMhzl4.jpeg",
  },
  {
    nickname: "Z",
    firstName: "Zoe",
    lastName: "Ciantra",
    description:
      "Met in college and we lived together for two years in Boston before she began her PHd program in immunology at New York University. She likes trashy reality tv, politics, reading, and podcasts.",
    imageUrl: "https://i.imgur.com/fqq9WCY.jpg",
  },
  {
    firstName: "Leah",
    lastName: "Kogan",
    description:
      "We've known each other since the fourth grade and became really good friends after we lived together after college. Spunky and loves going to concerts. Loves her cats, music, her girlfriend, and ramen",
    imageUrl: "https://i.imgur.com/s7h7FQ1.jpg",
  },
  {
    firstName: "Derek",
    lastName: "Kiy",
    description:
      "Really chill friend from college! Super artistic and works at a firm that designs national and international museums. He got really into playing the guitar over the pandemic. Knows the most random and interesting information",
    imageUrl: "https://i.imgur.com/xsWmfRN.jpg",
  },
  {
    nickname: "Syd",
    firstName: "Sydney",
    lastName: "Solommon",
    description:
      "Genuinely one of the funniest and kindest people I know. Works in cyber security and we've known each other since college. Currently travelling the US in a camper with her boyfriend hitting all of the national parks along the way",
    imageUrl: "https://i.imgur.com/UjaF9gg.jpg",
  },
  {
    firstName: "Adam",
    lastName: "Thorburn",
    description:
      "Loves to cook, loves photography, loves his cat Lou. Met working as paralegals and now he works for and organization that serves food to families in need in JP.",
    imageUrl: "https://i.imgur.com/3725DOO.jpg",
  },
  {
    firstName: "Milan",
    lastName: "Thakker",
    description:
      "Met playing soccer a few years back. Is an ultra athlete and runs Iron Mans consistently. Loves reading fantasy novels, Arsenal, and his dog Royce. Works in tech and works for a startup. Super hard to pin down because he works waaaaay too many hours",
    imageUrl: "https://i.imgur.com/9n9KWq6.jpg",
  },
];

const randyCommunications = [
  {
    title: "Friends for days",
    date: "2021-10-08",
    start: moment(new Date(2021, 9, 8, 4, 5)).format("YYYY/MM/DD hh:mm"),
    end: moment(new Date(2021, 9, 8, 4, 20)).format("YYYY/MM/DD hh:mm"),
    content:
      "the function renderEvent must return a ReactElement. The component should be wrapped inside a TouchableOpacity or any DOM element which accepts positioning and click events (onPress, ...)",
    type: "text",

    friendId: 6,
  },
  {
    title: "Banana",
    date: "2021-10-01",

    start: new Date(2021, 9, 1, 4, 5),
    end: new Date(2021, 9, 1, 4, 20),
    content: "bananaaaaaaaaaaa",
    type: "text",

    friendId: 7,
  },
  {
    title: "Apples",
    date: "2020-10-11",

    start: new Date(2021, 9, 11, 4, 5),
    end: new Date(2021, 9, 11, 4, 20),
    content: "aaaaaappleeeeeeees",
    type: "text",
    friendId: 6,
  },
  {
    title: "Woah",
    date: "2021-10-03",
    type: "letter",
    start: new Date(2021, 9, 3, 4, 5),
    end: new Date(2021, 9, 3, 4, 20),
    friendId: 2,
  },
  {
    title: "Went to a bbq",
    content: "wow apples are so good",
    type: "other",
    date: "2021-10-24",
    start: new Date(2021, 9, 24, 4, 5),
    end: new Date(2021, 9, 24, 4, 20),
    friendId: 6,
  },
  {
    title: "Groceries",
    date: "2021-10-27",
    start: new Date(2021, 9, 27, 4, 5),
    end: new Date(2021, 9, 27, 4, 20),
    type: "email",
    friendId: 7,
  },
  {
    title: "Word association",
    date: "2021-10-16",
    start: new Date(2021, 9, 16, 4, 5),
    end: new Date(2021, 9, 16, 4, 20),
    type: "social-media",
    friendId: 3,
  },
  {
    title: "Mango juice",
    date: "2021-10-14",

    start: new Date(2021, 9, 14, 4, 5),
    end: new Date(2021, 9, 14, 4, 20),
    type: "text",
    friendId: 3,
  },
  {
    title: "Jamba Juice",
    date: "2021-10-13",
    // start: '2021-10-11 04:05:02',
    // end: '2021-10-11 04:20:02',
    start: new Date(2021, 9, 13, 4, 5),
    end: new Date(2021, 9, 13, 4, 20),
    type: "social-media",
    friendId: 6,
  },
];

const recurringType = [
  {
    recurring_type: "daily",
  },
  {
    recurring_type: "weekly",
  },
  {
    recurring_type: "monthly",
  },
];

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables

  const randyUser = await User.create(randy);

  const newrandyFriends = await Promise.all(
    randyFriends.map((friend) => {
      return Friend.create({ userId: randyUser.id, ...friend });
    })
  );

  const newRandyContacts = await Promise.all(
    randyCommunications.map((contact) => {
      return Communication.create({ userId: randyUser.id, ...contact });
    })
  );

  const recurringTypes = await Promise.all(
    recurringType.map((type) => {
      return Recurring_Type.create(type);
    })
  );

  await newRandyContacts[0].setFriend(newrandyFriends[0]);
  await newRandyContacts[1].setFriend(newrandyFriends[0]);
  await newRandyContacts[2].setFriend(newrandyFriends[1]);
  await newRandyContacts[3].setFriend(newrandyFriends[2]);
  await newRandyContacts[4].setFriend(newrandyFriends[3]);
  await newRandyContacts[5].setFriend(newrandyFriends[4]);
  await newRandyContacts[6].setFriend(newrandyFriends[5]);
  await newRandyContacts[7].setFriend(newrandyFriends[5]);
  await newRandyContacts[8].setFriend(newrandyFriends[6]);

  console.log(green(`seeded ${newrandyFriends.length} friends`));
  console.log(green(`seeded ${newRandyContacts.length} communications`));
  console.log(green(`seeded ${recurringTypes.length} recurring types`));
  console.log(green("Seeding success!"));
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(red("Oh no! Something went wrong!"));
    console.error(err);
    console.log(red(err));
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
