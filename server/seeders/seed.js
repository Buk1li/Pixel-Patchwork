const db = require('../config/connection');
const { User, Thought, Pixel } = require('../models');
const userSeeds = require('./userSeeds.json');
const thoughtSeeds = require('./thoughtSeeds.json');
const cleanDB = require('./cleanDB');

const pixelWidth = 5;
const pixelHeight = 5;

db.once('open', async () => {
  try {
    await cleanDB('Thought', 'thoughts');

    await cleanDB('User', 'users');

    await cleanDB('Pixel', 'pixels');

    await User.create(userSeeds);

    for(let x = 0; x < pixelWidth; x++){
      for(let y = 0; y < pixelHeight; y++){
        Pixel.create({pixelColor: "#FFFFFF", placementUser: null, coordinates:[x, y]});
      }
    }

    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
