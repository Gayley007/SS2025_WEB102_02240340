const { likes } = require('../utils/mockData');

// @desc    Get all likes
// @route   GET /api/likes
// @access  Public
exports.getLikes = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, count: likes.length, data: likes });
});

// @desc    Get single like
// @route   GET /api/likes/:id
// @access  Public
exports.getLike = asyncHandler(async (req, res, next) => {
    const like = likes.find(like => like.id === req.params.id);
    if (!like) return next(new ErrorResponse('Like not found', 404));
    res.status(200).json({ success: true, data: like });
});

// @desc    Like a post
// @route   POST /api/likes
// @access  Private
exports.createLike = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const newLike = { id: (likes.length + 1).toString(), user_id: userId, post_id: req.body.post_id };
    likes.push(newLike);
    res.status(201).json({ success: true, data: newLike });
});

// @desc    Unlike a post
// @route   DELETE /api/likes/:id
// @access  Private
exports.deleteLike = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const index = likes.findIndex(like => like.id === req.params.id);
    if (index === -1) return next(new ErrorResponse('Like not found', 404));

    likes.splice(index, 1);
    res.status(200).json({ success: true, data: {} });
});
