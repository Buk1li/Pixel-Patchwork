const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  // This value is never displayed so it is never converted into a readable date
  // The value stays in milliseconds for easier math
  lastUpdate: {
    type: Number,
    default: 0,
  },
  isPremium:{
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// this method is called whenever a pixel is updated by the user
userSchema.methods.updateTime = function(){
  this.lastUpdate = Date.now();
  this.save();
}

const User = model('User', userSchema);

module.exports = User;
