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
        console.log(post + ' this is a post')
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
        .catch(error => {
            res.json(error)
            console.log(error.message)
        });
};

// export const updatePost = async (req, res) => {
//     const { id } = req.params;
//     const { data } = req.body;
//     console.log(id)
//     console.log(data)
    
//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
 
//     await PostMessage.findByIdAndUpdate({ _id: id }, data, { new: true })
//         .then((data) => res.json(data))
//         console.log("post updated")
//     // await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
//     // res.json(updatedPost);
// };


// export const updatePost = async (req, res) => {
//     const {id} = req.params;
//     const {data} = req.body;
//     console.log('the data: ' + data)
//     console.log('id: ' + id)
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).send(`No post with id: ${id}`);
//     }
//     await PostMessage.findByIdAndUpdate({ _id: id}, data, { new: true })
//         res.json(data);
// }
// export const updatePost = async (req, res) => {
//     try {
//       // update people by ID
//       console.log(req.params.id);
//       console.log(req.body);
//       res.json(
//         await PostMessage.findByIdAndUpdate(req.params.id, req.body)
//       );
//     } catch (error) {
//       //send error
//       res.status(400).json(error);
//     }
//   };


  export const updatePost = (req, res) => {
    PostMessage.findById(req.params.id)
      .then(post => {
        post.updateOne()
          .then((post) => res.json(post))
          // return 404 if not found
          .then(console.log(post + ' post updated'))
          .catch(err => res.status(404).json({ success: false }) )
      })
  };


export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
    // console.log(res.json(updatedPost));
};


export default router;