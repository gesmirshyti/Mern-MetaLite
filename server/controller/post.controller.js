const Post = require('../models/post.model'); 
const Comment = require('../models/comment.model');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require('dotenv').config();



//Create Post 
module.exports.createPost = (req, res) => {
    // Retrieve post data from the request body
    const { title, content } = req.body;
      const newPost = new Post({
      title,
      content,
    //   author: req.user._id
    });
  
    // Save the new post to the database
    newPost
      .save()
      .then((savedPost) => {
        res.json(savedPost);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };  

  module.exports.getAllPosts = (request, response) => {
    Post.find({})
        .then(post => {
            response.json(post);
        })
        .catch(err => {
            response.json(err)
        })
}
module.exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId; // Get the post ID from the request parameters
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Ensure the user is authorized to delete the post
    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }
    
    await Post.findByIdAndRemove(postId);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.getPostsByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL
    const posts = await Post.find({ author: userId });

    if (!posts) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.createComment = async (req, res) => {
  try {
    const { text, author, post } = req.body;
        const comment = new Comment({
      text,
      author, // The user who created the comment (should be the user's ID)
      post, // The post to which the comment belongs (should be the post's ID)
    });

    // Save the comment to the database
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.id; // Get the post ID from the URL
    const comments = await Comment.find({ post: postId }).populate('author');

    if (comments.length === 0) { // Check the length of the comments array
      return res.status(404).json({ message: 'No comments found for this post' });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.likeDislike = async (req,res) =>{
  try {
    const postId = req.params.postId;
    const userId = req.user._id; // Assuming you have user authentication in place

    // Check if the user has already liked the post
    const existingLike = await LikeDislike.findOne({ post_id: postId, user_id: userId, type: 'like' });

    if (existingLike) {
      // User has already liked the post, you can remove the like if desired
      await LikeDislike.findByIdAndRemove(existingLike._id);
    } else {
      // User has not liked the post, create a like
      await LikeDislike.create({ post_id: postId, user_id: userId, type: 'like' });
    }

    res.json({ message: 'Like updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
