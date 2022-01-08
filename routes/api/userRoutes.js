const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateSingleUser,
  deleteUser,
  getSingleFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateSingleUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(getSingleFriend).delete(deleteFriend);


module.exports = router;
