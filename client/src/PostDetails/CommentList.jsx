import React, { useState } from 'react';

const CommentList = ({ comments }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {displayedComments.map((comment) => (
          <li key={comment._id}>
            <p><h4>{comment.commentAuthor}</h4> :{comment.text}</p>
          </li>
        ))}
      </ul>
      {comments.length > 5 && (
        <button onClick={toggleShowAllComments}>
          {showAllComments ? 'Show Less' : 'See More'}
        </button>
      )}
              <p>Total Comments : {comments.length}</p>

    </div>
  );
};

export default CommentList;
