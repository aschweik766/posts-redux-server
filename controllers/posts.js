import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../database/models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
        // console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        console.log(post)
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// export const createPost = async (req, res) => {
//     const post = req.body;
//     const newPost = new PostMessage(post);
//     try {
//         await newPost.save();
//         res.status(201).json(newPost );
//         console.log(newPost);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//         console.log(error.message);
//     }
// };


export const createPost = async (req, res) => {
    console.log("new post created")
    const postData = new PostMessage({
        creator: req.body.creator,
        title: req.body.title,
        message: req.body.message,
        tags: req.body.tags,
        selectedFile: req.body.selectedFile,
    })
    postData.save()
        // .then(data => {
        //     res.json(data)
        //     console.log(res.json(data))
        //     // .then(res.status().json({userId: generatedUserId}))
        // })
        .catch(error => {
            res.json(error)
            console.log(error.message)
        });
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    // const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    console.log("updatePost")
    const updatedPost = {
        title: req.body.title,
        message: req.body.message,
        creator: req.body.creator,
        selectedFile: req.body.selectedFile,
        tags: req.body.tags,
        _id: id,
    };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    console.log(res.json({ message: "Post deleted successfully." }));
    // console.log(res.json(message));
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
    console.log(res.json(updatedPost));
};


export default router;