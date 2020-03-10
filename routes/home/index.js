const express = require('express');
const router  = express.Router(); 
const Post    = require('../../models/Post');
const Category= require('../../models/Category');
const User    = require('../../models/User');
const bcrypt  = require('bcryptjs');


    router.all('/*', (req, res, next) => {

        req.app.locals.layout = 'home';
        
        next();   

    });

    router.get('/', async(req , res ) => {

        const posts = await Post.find({});

        const category = await Category.find({});

        res.render('home/index', {posts: posts, category: category});
    });
    
    router.get('/about', (req , res) => {
    
        res.render('home/about');
    });
    
    router.get('/login', (req , res) => {
    
        res.render('home/login');
    });
    
    router.get('/register', async(req , res) => {

        const users = await User.find({});
    
        res.render('home/register');

    });

    router.post('/register', async(req , res) => {


        let errors = [];

        if(!req.body.firstname){

            errors.push({message: 'please enter your first name'});
        }

        if(!req.body.lastname){

            errors.push({message: 'please enter last name'});
        }

        if(!req.body.email){

            errors.push({message: 'please Add Email'});
        }

        if(!req.body.password){

            errors.push({message: 'please Add Password'});
        }

        if(!req.body.conformpassword){

            errors.push({message: 'Password Conform field cannot be empty'});
        }

        if(req.body.password !== req.body.conformpassword){

            errors.push({message: "Password field don't match"});
        }

        if(errors.length > 0){

            res.render('home/register', {

                errors: errors,
                firstname : req.body.firstname,
                lastname  : req.body.lastname,
                email     : req.body.email,
                password  : req.body.password
            });  
        }else
        {

        // const user = await User.findOne({email: req.body.email});

        //     if(!user){

                const newUser = new User({

                    firstname : req.body.firstname,
                    lastname  : req.body.lastname,
                    email     : req.body.email,
                    password  : req.body.password
                });
    
                bcrypt.genSalt(10, (err, salt) =>{
    
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
    
                        newUser.password = hash;
    
                        const saveUser = newUser.save();
    
                        req.flash('success_message', 'you are register, now you can login');
    
                        res.redirect('/login');
                        
                    });
                });
                
            //}
            // else
            // {
            //     req.flash('error_message', 'Email already exist, please login');
            // }   
            
        }

                

    });


    router.get('/post/:id', async(req, res) => {

        const  post = await Post.findOne({_id: req.params.id});

        const category = await Category.find({});

        res.render('home/post', {post: post, category: category});
    });

    module.exports = router;