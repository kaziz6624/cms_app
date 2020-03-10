const express = require('express');
const router  = express.Router(); 
const Post    = require('../../models/Post');

    router.all('/*', (req, res, next) => {

        req.app.locals.layout = 'admin';
        next();   

    });

    router.get('/', (req, res )=>{
        res.render('admin/index');
    });

    router.get('/dashboard', (req, res )=>{
        res.render('admin/dashboard');
    });

    // router.get('/post/:id', async(req, res) => {

    // const  post = await Post.findOne({_id: req.params.id});
    //     res.render('admin/dashboard', {post: post});
    // })


    module.exports = router;