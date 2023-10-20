const Comment = require('../models/comment.model'); // Import the Comment model

exports.createComment = async (req, res) => {
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

// exports.getCommentsByPost = async (req, res) => {
//   const postId = req.params.id; 

//   Post.findById(postId)
//     .populate('comments') 
//     .exec((err, post) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//       } else {
//         res.json(post.comments); 
//       }
//     });
// };