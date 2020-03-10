const Post = require("./../../models/Post");
const {isEmpty, uploadDir} = require('../../helpers/upload-helper');
const fs   = require('fs');

// Create Post

exports.createPost = async(req, res) => {

    let filename = '3.jpg';

    if(!isEmpty(req.files)){

        let file = req.files.file;

            filename = Date.now() + '-' + file.name;

            file.mv('./publocs/uploads/' + filename, (err) => {

            if(err) throw err;
        });
    }
    
    let allowComments = true;

    if(req.body.allowComments){

        allowComments = true;   
    }
    else
    {
        allowComments = false;
    }

    const newPost = new Post({

        title    : req.body.title,
        status   : req.body.status,
        allowComments : allowComments,
        body     : req.body.body,
        category : req.body.category,
        file     : filename
    });

   const savedPost = await newPost.save();
    try {
        req.flash('success_message', 'Post has been created successfully');
        res.redirect('/admin/posts');

    } catch (error) {
        console.log('could not save post');
    }
 }



// Edit Post
exports.editPost = async(req, res)=>{
    
    const post = await Post.findOne({_id: req.params.id});

        if(req.body.allowComments){

            allowComments = true;   
        }
        else
        {
            allowComments = false;
        }

        post.title    = req.body.title;
        post.status   = req.body.status;
        post.allowComments = allowComments;
        post.category = req.body.category;
        post.body     = req.body.body;

        if(!isEmpty(req.files)){

            let file = req.files.file;
    
                filename  = Date.now() + '-' + file.name;
                post.file = filename;
                file.mv('./publocs/uploads/' + filename, (err) => {
    
                if(err) throw err;
            });
        }

        const updatedPost = await post.save();

            res.redirect('/admin/posts');
}

// Delete Posts

exports.deletePost = async (req, res) =>{

    const post = await Post.findOne({_id: req.params.id});

         fs.unlink(uploadDir + post.file, (err) => {

             post.remove();

             res.redirect('/admin/posts');
         });
  
 }