const bcrypt = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');

// ===== HELPERS =====
const events = eventIds => {
  return Event.find({ _id: { $in: eventIds } })
    .then(events => {
      return events.map(event => ({
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator)
      }));
    });
};

const user = userId => {
  return User.findById(userId)
    .then(user => {
      if (!user) {
        throw new Error("User not found for this event creator");
      }

      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
      };
    });
};

// ===== RESOLVERS =====
module.exports = {

  // GET EVENTS
  events: () => {
    return Event.find()
      .then(events => {
        return events.map(event => ({
          ...event._doc,
          _id: event.id,
          creator: user.bind(this, event._doc.creator)
        }));
      });
  },

  // CREATE EVENT
  createEvent: async args => {

    // 🔒 STEP 1 – ENSURE AT LEAST ONE USER EXISTS
    const existingUser = await User.findOne();

    if (!existingUser) {
      throw new Error("Create a user first before creating events!");
    }

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),

      // ✅ ALWAYS valid user
      creator: existingUser._id
    });

    const result = await event.save();

    existingUser.createdEvents.push(result._id);
    await existingUser.save();

    return {
      ...result._doc,
      _id: result.id,
      creator: user.bind(this, result._doc.creator)
    };
  },

  // CREATE USER
  createUser: async args => {

    const existing = await User.findOne({
      email: args.userInput.email
    });

    if (existing) {
      throw new Error("User already exists!");
    }

    const hashedPassword = await bcrypt.hash(
      args.userInput.password,
      12
    );

    const user = new User({
      email: args.userInput.email,
      password: hashedPassword,
      createdEvents: []
    });

    const result = await user.save();

    return {
      ...result._doc,
      _id: result.id,
      password: null
    };
  }
};
