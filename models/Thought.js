const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: () => this.toLocaleDateString("en-US"),
    },
    username: [
      {
        type: String,
        required: true,
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'reaction',
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reaction.length
  }
  );

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
