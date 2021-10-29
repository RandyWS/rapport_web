"use strict";
const {
  db,
  models: { User, Friend, Communication, Recurring_Pattern, Recurring_Type },
} = require("../server/db");
const { green, red } = require("chalk");

const users = [
  {
    username: "HowlATME",
    password: "password",
    firstName: "Howl",
    lastName: "Pendragon",
    email: "Howl_Pendragon@gmail.com",
    imageUrl:
      "https://i.pinimg.com/736x/40/c2/ec/40c2ec16e1c646fd6c5e568d3d3028ab--howl-and-sophie-howls-moving-castle.jpg",
  },
  {
    username: "IH8SKOOL",
    password: "password1",
    firstName: "Chihiro",
    lastName: "Ogino",
    email: "Chihiro_Ogino@gmail.com",
    imageUrl:
      "https://discourse.disneyheroesgame.com/uploads/default/original/2X/7/73ae7c0a3c13f84f530762b55c3a56a2dfac81a8.jpg",
  },
  {
    username: "Eboshi",
    password: "password2",
    firstName: "Lady",
    lastName: "Eboshi",
    email: "Lady_Eboshi@gmail.com",
    imageUrl:
      "https://static.wixstatic.com/media/799edc_93f2862c1a7640db9ad52547d1b08507~mv2.png/v1/fill/w_398,h_396,al_c,q_85,usm_0.66_1.00_0.01/lady%20eboshi.webp",
  },
  {
    username: "Cats",
    password: "password3",
    firstName: "Cat",
    lastName: "Bus",
    email: "Cat_Bus@gmail.com",
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/gt_z0ExHHmCsLdHBSOxsMtuNSEo=/0x0:2048x1025/1200x800/filters:focal(770x330:1096x656)/cdn.vox-cdn.com/uploads/chorus_image/image/66875564/CatBus.0.jpg",
  },

  {
    firstName: "Apple",
    lastName: "Cider",
    email: "apple@banana.com",
    password: "password",
    username: "apple",
  },
];

const friends = [
  {
    nickname: "my love",
    firstName: "Sophie",
    lastName: "Hatter",
    imageUrl:
      "https://cdn.costumewall.com/wp-content/uploads/2017/09/sophie-hatter.jpg",
  },
  {
    nickname: "Princey",
    firstName: "Prince",
    lastName: "Ashitaka",
    imageUrl:
      "https://i.pinimg.com/originals/b7/d9/a0/b7d9a06ed4af82e9e6896ffd708dff55.jpg",
  },
  {
    nickname: "Jiro",
    firstName: "Jiro",
    lastName: "Horikoshi",
    imageUrl:
      "https://comicvine.gamespot.com/a/uploads/original/11/111746/4346533-jiro-horikoshi-the-wind-rises-24395-1680x1050.jpg",
  },
  {
    nickname: "Piggy",
    firstName: "Porco",
    lastName: "Rosso",
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/Ewo6PKQSzJshpFhv5U_kwrCkXb0=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/20009856/Porco_Rosso_963064296_large.jpg",
  },
  {
    nickname: "robo",
    firstName: "Laputian",
    lastName: "Robot",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFVq9TVZH_hjDqNaG_Isrwim6xOSqyEyxZDVyRGP9TxeA1VfuT-fm5N5fKAYvCs2WE5zg&usqp=CAU",
  },
];

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

const randy = {
  firstName: "Randy",
  lastName: "Stopa",
  email: "r@r.com",
  password: "password",
  username: "randy",
  imageUrl: "https://i.imgur.com/lcZJfH2.jpg",
};

const banana = {
  firstName: "Banana",
  lastName: "Mango",
  email: "banana@banana.com",
  password: "password",
  username: "banana",
};

const bananaFriends = [
  {
    nickname: "my love",
    firstName: "Banana",
    lastName: "Friend1",
  },
  {
    nickname: "Princey",
    firstName: "Banana",
    lastName: "Friend2",
  },
  {
    nickname: "Jiro",
    firstName: "Banana",
    lastName: "Friend3",
  },
  {
    nickname: "Piggy",
    firstName: "Banana",
    lastName: "Friend4",
  },
  {
    nickname: "robo",
    firstName: "Banana",
    lastName: "Friend5",
  },
];

const communications = [
  {
    title: "Hello my love!",
    date: "2021-10-08",
    start: "2021-10-08 04:05:02",
    end: "2021-10-08 04:20:02",
    content: "looooooooooooooove",
    type: "text",
  },
  {
    title: "Banana",
    date: "2021-10-01",
    start: "2021-10-01 04:05:02",
    end: "2021-10-01 04:20:02",
    content: "bananaaaaaaaaaaa",
    type: "text",
  },
  {
    title: "Apples",
    date: "2020-10-11",
    start: "2021-10-11 04:05:02",
    end: "2021-10-11 04:20:02",
    content: "aaaaaappleeeeeeees",
    type: "text",
  },
  {
    title: "Woah",
    date: "2021-10-03",
    start: "2021-10-03 04:05:02",
    end: "2021-10-03 04:20:02",
  },
  {
    title: "Cheese",
    content: "cheeeeeeeeeeeeeeeeeese",
    date: "2021-10-24",
    start: "2021-10-24 04:05:02",
    end: "2021-10-24 04:20:02",
    type: "text",
  },
  {
    title: "Groceries",
    date: "2021-09-27",
    start: "2021-09-27 04:05:02",
    end: "2021-09-27 04:20:02",
    type: "text",
  },
  {
    title: "Word association",
    date: "2021-10-16",
    start: "2021-10-16 04:05:02",
    end: "2021-10-16 04:20:02",
    type: "text",
  },
  {
    title: "Mango juice",
    date: "2021-09-30",
    start: "2021-09-30 04:05:02",
    end: "2021-09-30 04:20:02",
    type: "text",
  },
  {
    title: "Jamba Juice",
    date: "2021-10-11",
    start: "2021-10-11 04:05:02",
    end: "2021-10-11 04:20:02",
    type: "text",
  },
];

const bananaCommunications = [
  {
    title: "Hello my love!",
    date: "2021-10-08",
    start: new Date(2021, 9, 8, 4, 5),
    end: new Date(2021, 9, 8, 4, 20),
    content: "looooooooooooooove",
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
    start: new Date(2021, 9, 3, 4, 5),
    end: new Date(2021, 9, 3, 4, 20),

    friendId: 9,
  },
  {
    title: "Cheese",
    content: "cheeeeeeeeeeeeeeeeeese",
    date: "2021-10-24",
    start: new Date(2021, 9, 24, 4, 5),
    end: new Date(2021, 9, 24, 4, 20),
    type: "text",

    friendId: 6,
  },
  {
    title: "Groceries",
    date: "2021-09-27",
    start: new Date(2021, 9, 27, 4, 5),
    end: new Date(2021, 9, 27, 4, 20),
    type: "text",

    friendId: 7,
  },
  {
    title: "Word association",
    date: "2021-10-16",
    start: new Date(2021, 9, 16, 4, 5),
    end: new Date(2021, 9, 16, 4, 20),
    type: "text",

    friendId: 8,
  },
  {
    title: "Mango juice",
    date: "2021-09-30",
    start: new Date(2021, 8, 30, 4, 5),
    end: new Date(2021, 8, 30, 4, 20),
    type: "text",

    friendId: 8,
  },
  {
    title: "Jamba Juice",
    date: "2021-10-11",
    // start: '2021-10-11 04:05:02',
    // end: '2021-10-11 04:20:02',
    start: new Date(2021, 9, 11, 4, 5),
    end: new Date(2021, 9, 11, 4, 20),
    type: "text",
    friendId: 6,
  },
];

const randyCommunications = [
  {
    title: "Friends for days",
    date: "2021-10-08",

    start: new Date(2021, 9, 8, 4, 5),
    end: new Date(2021, 9, 8, 4, 20),
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
    friendId: 9,
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
    friendId: 8,
  },
  {
    title: "Mango juice",
    date: "2021-10-14",

    start: new Date(2021, 9, 14, 4, 5),
    end: new Date(2021, 9, 14, 4, 20),
    type: "text",
    friendId: 8,
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

  // Creating Users
  const newUsers = await Promise.all(
    users.map(async (user) => {
      const newUser = await User.create(user);
      return newUser;
    })
  );

  // Creating Friends
  const newFriends = await Promise.all(
    friends.map((friend) => {
      return Friend.create(friend);
    })
  );

  const newContacts = await Promise.all(
    communications.map((contact) => {
      return Communication.create(contact);
    })
  );

  const bananaUser = await User.create(banana);

  const newBananaFriends = await Promise.all(
    bananaFriends.map((friend) => {
      return Friend.create({ userId: bananaUser.id, ...friend });
    })
  );

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

  const newBananaContacts = await Promise.all(
    bananaCommunications.map((contact) => {
      return Communication.create({ userId: bananaUser.id, ...contact });
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

  await newFriends[0].setUser(newUsers[0]);
  await newContacts[0].setUser(newUsers[0]);
  await newContacts[0].setFriend(newFriends[0]);
  await newContacts[6].setUser(newUsers[0]);
  await newContacts[6].setFriend(newFriends[0]);
  await newContacts[7].setUser(newUsers[0]);
  await newContacts[7].setFriend(newFriends[0]);

  await newFriends[2].setUser(newUsers[0]);
  await newContacts[2].setUser(newUsers[0]);
  await newContacts[2].setFriend(newFriends[2]);

  await newFriends[1].setUser(newUsers[0]);
  await newContacts[1].setUser(newUsers[0]);
  await newContacts[1].setFriend(newFriends[1]);
  await newContacts[8].setUser(newUsers[0]);
  await newContacts[8].setFriend(newFriends[1]);

  await newFriends[2].setUser(newUsers[1]);
  await newContacts[3].setUser(newUsers[1]);
  await newContacts[3].setFriend(newFriends[2]);

  await newFriends[3].setUser(newUsers[2]);
  await newContacts[4].setUser(newUsers[2]);
  await newContacts[4].setFriend(newFriends[3]);
  await newContacts[5].setUser(newUsers[2]);
  await newContacts[5].setFriend(newFriends[3]);

  await newFriends[4].setUser(newUsers[2]);

  console.log(green(`seeded ${newUsers.length} users`));
  console.log(green(`seeded ${newFriends.length} friends`));
  console.log(green(`seeded ${newContacts.length} communications`));
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
