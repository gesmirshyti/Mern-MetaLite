import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({ comments }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const displayedComments = showAllComments ? comments : comments.slice(0, 5);

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div>
      <h4>Comments</h4>
      <ul >
        {displayedComments.map((comment) => (
          <li className='d-flex' key={comment._id}>
       
              <h4>{comment.commentAuthor}</h4> 
            <p>: {comment.text}</p>
         
          </li>
        ))}
      </ul>
      {comments.length > 5 && (
        <Link onClick={toggleShowAllComments}>
          {showAllComments ? 'Show Less' : 'See More'}
        </Link>
      )}
              <p>Total Comments : {comments.length}</p>

    </div>
  );
};

export default CommentList;
