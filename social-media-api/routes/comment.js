const express = require("express");
const { addComment, deleteComment } = require("../controllers/commentController");

const router = express.Router();

// Add a comment to a post
router.post('/posts/:id/comment', addComment);

// Delete a comment
router.delete('/comments/:id', deleteComment);

module.exports=router;