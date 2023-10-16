const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [{
      postedBy:{
        type: mongoose.Schema.Types.ObjectId,ref:'User'
      },
        text:String,
        created: {type:Date,default :Date.now}
      }],
      Like: [{
        type: String,
        enum: ['like', 'dislike'],
        likedAt: { type: Date, default: Date.now },
      }]
    // Duhen shtuar te tjera
  }, { timestamps: true });
  
  module.exports = mongoose.model('Post', postSchema);
