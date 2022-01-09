const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getUsername, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];
  const usernames = []
  // // Get some random assignment objects using a helper function that we imported from ./data
  var thoughts = [];

  // Loop 5 times -- create users
  for (let i = 0; i < 5; i++) {
    const username = getUsername(i);
    const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@gmail.com`;
    users.push({
      username,
      email,
      thoughts: [],
    });
    usernames.push(username);
  }
  //Loop through thought and create thoughts
  usernames.forEach(username => {
    const thoughtText = getRandomThoughts(1);
    thoughts.push({
      thoughtText,
      username,
    })
  });

  // Save thoughts to database
  await Thought.collection.insertMany(thoughts);
  //update users with thoughts
  for (const user of users) {
    //get the thought for the user
    await Thought.find({ username: user.username })
      .then(async (savedThoughts) => {
        //thought id
        var mySavedThoughts = savedThoughts.map(thought => {return thought.id});
        // insert the thought id into users thoughts array
        user.thoughts.push(
          mySavedThoughts,
        );
      });
  }

  // Add user to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
