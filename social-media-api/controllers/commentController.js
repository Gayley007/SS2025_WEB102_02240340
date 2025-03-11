const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { comments, users } = require('../utils/mockData');

// @desc    Get all comments
// @route   GET /api/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, count: comments.length, data: comments });
});

// @desc    Get specific comment
// @route   GET /api/comments/:id
// @access  Public
exports.getComment = asyncHandler(async (req, res, next) => {
    const comment = comments.find(comment => comment.id === req.params.id);
    if (!comment) return next(new ErrorResponse('Comment not found', 404));
    res.status(200).json({ success: true, data: comment });
});

// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
exports.createComment = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const newComment = { id: (comments.length + 1).toString(), user_id: userId, post_id: req.body.post_id, text: req.body.text };
    comments.push(newComment);
    res.status(201).json({ success: true, data: newComment });
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
exports.updateComment = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    let comment = comments.find(comment => comment.id === req.params.id);
    if (!comment) return next(new ErrorResponse('Comment not found', 404));

    if (comment.user_id !== userId) return next(new ErrorResponse('Not authorized to update this comment', 401));

    const index = comments.findIndex(comment => comment.id === req.params.id);
    comments[index] = { ...comment, text: req.body.text };

    res.status(200).json({ success: true, data: comments[index] });
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
    const userId = req.header('X-User-Id');
    if (!userId) return next(new ErrorResponse('Not authorized', 401));

    const index = comments.findIndex(comment => comment.id === req.params.id);
    if (index === -1) return next(new ErrorResponse('Comment not found', 404));

    comments.splice(index, 1);
    res.status(200).json({ success: true, data: {} });
});