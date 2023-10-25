const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required:[true,"Post Title is required"],
    },
    hashtag: {
      type: String,
    },
    image: {
      type: String,
      required:[true,"Post Image is required"],
    },
    postDescription:{
      type:String,
      required:[true,"Post Description is required"],
    }
,

    author: {
     type:String
    },
    comments: [{
      text:{type:String},
      postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
      },
      commentAuthor: {
        type:String
       },
      post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
      },
      text: {type:String},

      }],

    // likes: [{
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'User',
    //     }],
  }, { timestamps: true });
  
  module.exports = mongoose.model('Post', postSchema);
