const UserController = require("../controller/user.controller")
const { authenticate } = require('../config/jwt.config');
const PostController = require("../controller/post.controller");
const ContactController = require("../controller/contact.controller")

module.exports =(app) =>{
    app.post("/api/register",UserController.register)
    app.post("/api/login",UserController.login)
    app.post("/api/logout",UserController.logout)
    app.patch('/api/profile/update/:id', UserController.updateUser);
    app.get('/api/users/:id', UserController.getUser)

    app.get('/api/profile/posts',authenticate, PostController.getAllPosts); 
    app.post('/api/profile/createPost', PostController.createPost);
    app.delete('/api/profile/:id',authenticate, PostController.deletePost);  
    app.get('/api/post/:id', PostController.getPost)
    app.patch('/api/post/details/edit/:id', PostController.updatePost)
    app.post('/api/home/comments/create', PostController.createComment);
    app.post('/api/contact', ContactController.createContact);


}