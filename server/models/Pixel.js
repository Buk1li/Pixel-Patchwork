const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// this regex makes sure the color picked is a valid hex color value
const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);

// this validator makes sure the coordinates of the pixel is an array of length 2
const arrayLimit = (coords) => {
    return coords.length == 2;
}

const pixelSchema = new Schema({
  pixelColor: {
    type: String,
    validator: [colorValidator, "Invalid Color"],
    required: true,
  },
  placementUser: {
    type: String
  },
  coordinates: {
    type: Array,
    required: true,
    validator: [arrayLimit, "Coordinates should have exactly two values"]
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    //get: (timestamp) => dateFormat(timestamp),
    set: Date.now
  },
});

const Pixel = model('Pixel', pixelSchema);

module.exports = Pixel;
