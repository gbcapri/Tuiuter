import express from 'express';
import { createPost, getUserPosts, updatePost, deletePost } from '../controllers/post-controller.js';

const router = express.Router();

router.post('/', createPost);

router.get('/', getUserPosts);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

export default router;
