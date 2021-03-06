const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        res.json(thoughts);
        console.table(thoughts);
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought (`_id` to the associated user's `thoughts` array field)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought.username);
        User.findOneAndUpdate(
          { username: thought.username },
          { $push: { thoughts: thought.id } },
        )
          .then((user) => {
            console.log(user);
            !user
              ? res
                .status(404)
                .json({ message: 'Thought created, but found no user with that ID' })
              : res.json('Created the thought')
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate(
            { username: thought.username },
            { $unset: { thoughts: thought.thoughtId } },
            { runValidators: true, new: true }
          )
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  //Create reaction in thought
  createThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) => 
      !reaction
      ? res.status(404).json({ message: 'No thought with this ID' })
      : res.json(reaction.reactions))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //Delete reaction
  deleteThoughtReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: {reactions: {reactionId: req.params.reactionId}} },
      { runValidators: true}
    )
      .then((reaction) => {
        !reaction
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.status(200).json({ message: 'Success' })
      })
      .catch((err) => res.status(500).json(err));
  },
};