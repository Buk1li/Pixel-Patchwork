const { User, Comment, Pixel } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const { GraphQLError } = require('graphql');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);


const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    comments: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },
    comment: async (parent, { commentId }) => {
      return Comment.findOne({ _id: commentId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('comments');
      }
      throw AuthenticationError;
    },
    pixels: async () => {
      return Pixel.find();
    },
    checkout: async (_, args, context) => {
      if(context.user){
        const url = new URL(context.headers.referer).origin;
        try{
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items:[{
              price_data: {
                currency: 'usd',
                product_data: {
                  name: "Pixel Patchwork Premium Membership",
                  description: "Gain access to faster pixel placement",
                },
                unit_amount: 60
              },
              quantity: 1
            }],
            mode: 'payment',
            success_url: `${url}/paymentSuccessful`,
            cancel_url:`${url}/premium`
          })

          
          return {session: session.id};
        }
        catch(e){
          console.error(e);
        }
      }
      throw AuthenticationError
    }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      try{
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      }
      catch(e){
        console.error(e);
        throw new GraphQLError("Username or email already in use or invalid");
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addComment: async (parent, { commentText }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          commentText,
          commentAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { comments: comment._id } }
        );

        return comment;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    removeComment: async (parent, { commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findOneAndDelete({
          _id: commentId,
          commentAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { comments: comment._id } }
        );

        return comment;
      }
      throw AuthenticationError;
    },
    // this resolver likely won't be used
    addPixel: async (parent, { pixelColor, placementUser, coordinates }) => {
      return Pixel.create({ pixelColor, placementUser, coordinates });
    },
    updatePixel: async (parent, { pixelColor, placementUser, coordinates }, context) => {
      if(context.user){
        const pixel = await Pixel.findOneAndUpdate(
          {coordinates: coordinates},
          {
            $set:{pixelColor, placementUser, coordinates, updatedAt: Date.now()}
          },
          {new:true}
        );

        // This tells the user object to set their lastUpdate value to the current time
        const user = await User.findOne({username: placementUser});

        if (!user) {
          throw AuthenticationError;
        }

        user.updateTime();

        const token = signToken(user);

        return {token, user};
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
