const express = require("express");
const { followUser, unfollowUser } = require("../controllers/followersController");

const router = express.Router();

// Follow a user
router.post('/users/:id/follow', followUser);

// Unfollow a user
router.delete('/users/:id/follow', unfollowUser);

module.exports=router;