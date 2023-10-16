const Comment = require('../models/post.model'); // Import the Comment model

// Create a new comment
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

// Retrieve comments for a specific post
exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.id; // Get the post ID from the URL
    const comments = await Comment.find({ post: postId }).populate('author');

    if (!comments) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};