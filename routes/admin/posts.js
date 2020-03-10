const express    = require('express');
const router     = express.Router(); 
const Post       = require('../../models/Post');
const Category   = require('../../models/Category');
const {editPost, createPost, deletePost} = require("./../handlers/posts");


    router.all('/*', (req, res, next) => {

        req.app.locals.layout = 'admin';
        next();
    });

    router.get('/', async(req, res) => {
        try {
            
            const posts = await Post.find({}).populate('category');

            res.render('admin/posts', {posts: posts});
            
        } catch (error) {

            console.log(error);
        }
    });

    router.get('/create', async(req, res) => {

        const categories  = await Category.find({});

        res.render('admin/posts/create', {categories: categories});
     });

     

     router.post('/create', createPost);




     router.get('/edit/:id', async(req, res) => {

            const post = await Post.findOne({_id: req.params.id})

            const categories  = await Category.find({});

            res.render('admin/posts/edit', {post: post, categories: categories});
     });

    router.put('/edit/:id', editPost);
     


    router.delete('/:id', deletePost);

    
     
    module.exports = router;