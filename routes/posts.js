import express from 'express';

import { getPosts, createPost, updatePost, getPost, deletePost, likePost } from '../controllers/posts.js'
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;