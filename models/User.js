const { Schema, model } = require('mongoose');

// username

// String
// Unique
// Required
// Trimmed

// email

// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation). GOOGLE THE MONGOOSE DOCS OR GOOGLE MONGOOSE MATCH VALIDATOR FOR EMAIL 

// thoughts

// Array of _id values referencing the Thought model

// friends

// Array of _id values referencing the User model (self-reference)

const userSchema = new Schema(
{
username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
},
email: {
    type: String,
    unique: true,
    required: true,
    // match: 
},
thoughts: [
    {
        type: Schema.Types.ObjectId,
        ref: "Thought"
    }
],
friends: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
]


},
{
    toJSON: {
        virtuals: true,
      },
      id: false, 
}
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })

  // Initialize our User model
const User = model('User', userSchema);

module.exports = User;