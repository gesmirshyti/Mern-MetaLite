import React, { useState } from 'react';

const LikeDislike = () => {
  const [totalLikes, setTotalLikes] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault()
    if (!likeClicked) {
      setTotalLikes(totalLikes + 1);
      setLikeClicked(true);
      if (dislikeClicked) {
        setDislikeClicked(false);
        setTotalLikes(totalLikes + 1); // Adjust for changing from dislike to like
      }
    } else {
      setTotalLikes(totalLikes - 1);
      setLikeClicked(false);
    }
  };

  const handleDislike = (e) => {
    e.preventDefault()
    if (!dislikeClicked) {
      setTotalLikes(totalLikes - 1);
      setDislikeClicked(true);
      if (likeClicked) {
        setLikeClicked(false);
        setTotalLikes(totalLikes - 1); // Adjust for changing from like to dislike
      }
    } else {
      setTotalLikes(totalLikes + 1);
      setDislikeClicked(false);
    }
  };

  return (
    <div>
      <button onClick={handleLike} style={{ backgroundColor: likeClicked ? 'lightblue' : 'white' }}>
        Like
      </button>
      <button onClick={handleDislike} style={{ backgroundColor: dislikeClicked ? 'red' : 'white' }}>
        Dislike
      </button>
      <span>Total Likes: {totalLikes}</span>
    </div>
  );
};

export default LikeDislike;
