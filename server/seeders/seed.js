const db = require('../config/connection');
const { User, Comment, Pixel } = require('../models');
const userSeeds = require('./userSeeds.json');
const commentSeeds = require('./commentSeeds.json');
const cleanDB = require('./cleanDB');

const pixelWidth = 10;
const pixelHeight = 10;

db.once('open', async () => {
  try {
    await cleanDB('Comment', 'comments');

    await cleanDB('User', 'users');

    await cleanDB('Pixel', 'pixels');

    await User.create(userSeeds);

    for(let x = 0; x < pixelWidth; x++){
      for(let y = 0; y < pixelHeight; y++){
        Pixel.create({pixelColor: "#FFFFFF", placementUser: null, coordinates:[x, y]});
      }
    }

    for (let i = 0; i < commentSeeds.length; i++) {
      const { _id, commentAuthor } = await Comment.create(commentSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: commentAuthor },
        {
          $addToSet: {
            comments: _id,
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
