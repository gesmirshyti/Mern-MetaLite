// import React, { useState } from 'react';
// import axios from 'axios';

// const LikeDislike = ({postId}) => {
//   const [totalLikes, setTotalLikes] = useState(0);
//   const [likeClicked, setLikeClicked] = useState(false);

//   const handleLike = (e) => {
//     e.preventDefault()

//     if (!likeClicked) {
//       console.log(postId)
//       axios.post(`http://localhost:8000/api/posts/like/${postId}`,{},{withCredentials:true})
//       .then((response) => {

//       setTotalLikes(totalLikes + 1);
//       setLikeClicked(true);
//       console.log(response.data)
//       if (dislikeClicked) {
//         axios.post(`http://localhost:8000/api/posts/dislike/${postId}`,{},{withCredentials:true})

//         setDislikeClicked(false);
//         setTotalLikes(totalLikes + 1); 
//       }
//     })
//     .catch((error) => {
//       console.error("Error liking the post:", error);
//     });
//     } else {
//       setTotalLikes(totalLikes - 1);
//       setLikeClicked(false);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLike} style={{ backgroundColor: likeClicked ? 'lightblue' : 'white' }}>
//         Like
//       </button>
//       <button onClick={handleDislike} style={{ backgroundColor: dislikeClicked ? 'red' : 'white' }}>
//         Dislike
//       </button>
//       <span>Total Likes: {totalLikes}</span>
//     </div>
//   );
// };

// export default LikeDislike;
