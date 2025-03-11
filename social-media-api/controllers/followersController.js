const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { followers } = require('../utils/mockData');

// @desc    Get all followers
// @route   GET /api/followers
// @access  Public
exports.getFollowers = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, count: followers.length, data: followers });
});

// @desc    Get single follower
// @route   GET /api/followers/:id
// @access  Public
exports.getFollower = asyncHandler(async (req, res, next) => {
    const follower = followers.find(follower => follower.id === req.params.id);
    if (!follower) return next(new ErrorResponse('Follower not found', 404));
    res.status(200).json({ success: true, data: follower });
});

// @desc    Follow a user
// @route   POST /api/followers
// @access  Private
exports.createFollower = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const newFollow = { id: (followers.length + 1).toString(), follower_id: userId, following_id: req.body.following_id };
    followers.push(newFollow);
    res.status(201).json({ success: true, data: newFollow });
});

// @desc    Unfollow a user
// @route   DELETE /api/followers/:id
// @access  Private
exports.deleteFollower = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const index = followers.findIndex(follow => follow.id === req.params.id);
    if (index === -1) return next(new ErrorResponse('Follow relationship not found', 404));

    followers.splice(index, 1);
    res.status(200).json({ success: true, data: {} });
});
