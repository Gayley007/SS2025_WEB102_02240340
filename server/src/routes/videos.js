const express = require('express');
const videoController = require('../controllers/videoController');

const router = express.Router();

// GET all videos
router.get('/', videoController.getAllVideos);

// POST create a new video
router.post('/', videoController.createVideo);

// GET video by ID
router.get('/:id', videoController.getVideoById);

// PUT update a video
router.put('/:id', videoController.updateVideo);

// DELETE a video
router.delete('/:id', videoController.deleteVideo);

// GET video comments
router.get('/:id/comments', videoController.getVideoComments);

// GET video likes
router.get('/:id/likes', videoController.getVideoLikes);

// POST like a video
router.post('/:id/likes', videoController.likeVideo);

// DELETE unlike a video
router.delete('/:id/likes', videoController.unlikeVideo);

module.exports = router;
