const UserController = require("../controller/user.controller")
const { authenticate } = require('../config/jwt.config');
const PostController = require("../controller/post.controller");

module.exports =(app) =>{
    app.post("/api/register",UserController.register)
    app.post("/api/login",UserController.login)
    app.post("/api/logout",UserController.logout)
    app.get('/api/profile/posts',authenticate, PostController.getAllPosts); 
    app.post('/api/profile/createPost', PostController.createPost);
    app.get('/api/profile/posts/:id',authenticate, PostController.getPostsByUserId);
    app.delete('/api/profile/:id',authenticate, PostController.deletePost);  
}