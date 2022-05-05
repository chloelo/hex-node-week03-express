const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts')

router.get('/', postsController.getPosts);
router.post('/', postsController.createPost);
router.delete('/', postsController.deletePosts);
router.delete('/:id', postsController.deletePost);
router.patch('/:id', postsController.patchPost);

module.exports = router;