const usernames = [
  'Angel_Egotrip',
  'Made_Savage',
  'Binary_Bark',
  'The_Deal',
  'Aaron-James',
  'Fiddle_Pie',
  'Raid_Brigade',
  'Geez_God',
  'Mindhack_Diva',
  'Sugar_Lump',
  'ArmorOfOdd',
  'HimAgain',
  'Prep_Station',
  'Grimster',
  'Whack_Stack',
  'Chub_Bubbly',
];

const thoughtDescriptions = [
  'Im So Embarrassed. I Wish Everybody Else Was Dead.',
  'Valentines Day Is Coming? Oh Crap - I Forgot To Get A Girlfriend Again.',
  'Fry, Its Been Years Since Medical School, So Remind Me. Disemboweling In Your Species: Fatal Or Non-Fatal?',
  'Well, You Obviously Wont Listen To Reason. So, I Guess Ill Listen To Idiotic-Ness And Come With You.',
  'Now, Now. There Will Be Plenty Of Time To Discuss Your Objections When And If You Return.',
  'Finally, A Uniform Id Be Happy To Be Caught Dead In!',
  'If You Ask Me, Its Mighty Suspicious. Im Gonna Call The Police. Right After I Flush Some Things.',
  'I Got Your Distress Call And Came Here As Soon As I Wanted To.',
  'Did Everything Just Taste Purple For A Second?',
  'My Story Is A Lot Like Yours, Only More Interesting Cause It Involves Robots.',
  'Everyone, I Have A Very Dramatic Announcement, So Anyone With A Weak Heart Should Leave Now. Goodbye.',
  'Bite My Shiny Metal A—!',
  'At The Risk Of Sounding Negative, No.',
  'Shut Up And Take My Money!',
  'Oh wait, youre serious. Let me laugh even harder.',
  'In the game of chess you can never let your adversary see your pieces.',
  'This is the worst kind of discrimination. The kind against me!',
  'You cant keep boogieing like this. Youll come down with a fever of some sort.',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getUsername = (index) =>
  `${usernames[index]}`;

// Function to generate random thoughts that we can add to student object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtDescriptions),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getUsername, getRandomThoughts };
