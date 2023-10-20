const Post = require('../models/post.model'); 
const Comment = require('../models/comment.model');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
require('dotenv').config();

module.exports.createPost = (req, res) => {

  Post.create(req.body)
  .then((post) => {
    const postId = post._id; 
    // localStorage.setItem('postId', postId);
    res.json({ postId, post }); 
  })
  .catch(err => res.status(300).json(err));
  }; 
module.exports.getAllPosts = (request, response) => {

  Post.find({})
  .then(post => {
            console.log(post);
            response.json(post);
          })
          .catch(err => {
            response.json(err)
          })
        };
        
module.exports.getPost = (request, response) => {
          Post.findOne({ _id: request.params.id })
        .then(person => response.json(person))
        .catch(err => response.json(err));
      }
      
module.exports.deletePost = (request, response) => {
        Post.deleteOne({ _id: request.params.id })
            .then(deleteConfirmation => response.json(deleteConfirmation))
            .catch(err => response.json(err))
      }

      
module.exports.createComment = async (req, res) => {
        try {
          const { text, postedBy, post } = req.body;
          // const postId = localStorage.getItem('postId');

          const comment = new Comment({
            text,
            postedBy,
            post
          });
          await comment.save();
      
          const updatedPost = await Post.findOneAndUpdate(
            { postId: post },
            { $push: { comments: comment._id } }, 
            { new: true } 
          );
      
          res.status(201).json({ comment, updatedPost });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      };

  module.exports.addCommentToPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const newComment = await Comment.create(req.body);
      post.comments.push(newComment);
      await post.save();
  
      const comments = await Comment.find({ post: postId });
  
      return res.json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
  
  
  
  


// Duhet ta shofesh Like Pastaj
  module.exports.addLike = (req, res) => {
    const postId = req.params.postId;
  
    Post.findById(postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
  
        const likeCount = post.likes.length;
        return res.json({ likeCount });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      });
  };









// const { title, content } = req.body;
//   const newPost = new Post({
//   title,
//   content,
// //   author: req.user._id
// });

// newPost
//   .save()
//   .then((savedPost) => {
//     res.json(savedPost);
//   })
//   .catch((err) => {
//     res.status(500).json(err);
//   });


//   module.exports.createPirate = (request, response) => {
//     Pirate.create(request.body)
//     .then((pirate) => response.json(pirate))
//     .catch(err => response.status(300).json(err));
// };


// module.exports.getLikeCount = (req, res) => {
//   const postId = req.params.postId;

//   Post.findById(postId)
//     .then((post) => {
//       if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//       }

//       const likeCount = post.likes.length;
//       return res.json({ likeCount });
//     })
//     .catch((error) => {
//       console.error(error);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     });
// };

// module.exports.getCommentsByPost = async (req, res) => {
  //   try {
    //     const postId = req.params.id;
    //     const comments = await Comment.find({ post: postId }).populate('author',[]);

    //     if (comments.length === 0) { 
//       return res.status(404).json({ message: 'No comments found for this post' });
//     }

//     res.status(200).json(comments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


  // module.exports.getPostsByUserId = async (req, res) => {
  //   try {
  //     const userId = req.params.id; // Get the user ID from the URL
  //     const posts = await Post.find({ author: userId });
  
  //     if (!posts) {
  //       return res.status(404).json({ message: 'No posts found for this user' });
  //     }
  
  //     res.status(200).json(posts);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // };