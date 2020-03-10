const express = require('express');
const router  = express.Router(); 
const Category    = require('../../models/Category');

    router.all('/*', (req, res, next) => {

        req.app.locals.layout = 'admin';
        next();   

    });

    router.get('/', async(req, res) => {
        try {
            const categories = await Category.find({});

            res.render('admin/categories/index', {categories: categories});
            
        } catch (error) {

            console.log(error);
        }
    });

    router.post('/create', async(req, res) => {

        const NewCategory = new Category({

            name : req.body.name
        });

        const saveCategory = await NewCategory.save();

            res.redirect('/admin/categories');
    });

    router.get('/edit/:id', async(req, res) => {

        const category = await Category.findOne({_id: req.params.id});

        res.render('admin/categories/edit', {category: category});
    });

    router.put('/edit/:id', async(req, res) => {

        const category = await Category.findOne({_id: req.params.id});

        category.name = req.body.name

        const updateCategory = category.save();

        res.redirect('/admin/categories');
    });

    router.delete('/:id', async(req, res) => {

        const result = await Category.remove({_id: req.params.id});

        res.redirect('/admin/categories');
    });


    module.exports = router;