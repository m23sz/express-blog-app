const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router
    .get('/about', (req, res) => {
        res.render('about', {
            currentRoute: '/about',
        });
    })


    .get('/contact', (req, res) => {
        res.render('contact');
    })

    .get('/', async (req, res) => {
        try {
            const locals = {
                title:"NodeJs Blog",
                description: "Simple Blog created with NodeJs, Express & MongoDb"
            }

        let perPage = 5;
        let page = req.query.page || 1

        const data = await Post.aggregate([ {$sort: {createdAt: 1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec()
        
        const count = await Post.countDocuments();
        const nextPage = parseInt(page + 1)
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/',
        });

        } catch(error) {
            console.log(error);
        }
    })

    .get('/post/:id', async (req, res) => {
        try {
            let slug = req.params.id;

            const data = await Post.findById({ _id: slug});

            const locals = {
                title: data.title,
                description: "Simple Blog created with NodeJs, Express & MongoDb",
            }
            
            res.render('post', {locals, data, currentRoute: `/post/${slug}`,},
        );
        } catch(error) {
            console.log(error);
        }
    })


    .post('/search', async (req, res) => {   
        try {
            const locals = {
                title:"NodeJs Blog",
                description: "Simple Blog created with NodeJs, Express & MongoDb",
            }

            let searchTerm = req.body.searchTerm;
            const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g,"");

            const data = await Post.find({
                $or: [
                    { title: { $regex: new RegExp(searchNoSpecialChar,  'i') }},
                    { body: { $regex: new RegExp(searchNoSpecialChar,  'i') }} 
                    ]
                });

            res.render('search', {
                data,
                locals
            });
            
        } catch(error) {
            console.log(error);
        }
    })




    // .get('/', async (req, res) => {
    //     const locals = {
    //         title:"NodeJs Blog",
    //             description: "Simple Blog created with NodeJs, Express & MongoDb",
    //     }
    //     try {
    //         const data = await Post.find();
    //         res.render('index', {locals, data},
    //     );
    //     } catch(error) {
    //         console.log(error);
    //     }
    // })



    

// function inesrtPostData() {
//     Post.insertMany([
//         {
//             title:'Napoleon król czy książe warszwaski',
//             body: "Czy Księstwo warszawskie było ważne dla Bonapartego?"
//         },
//     ])
// }
// inesrtPostData()

module.exports = {
    router,
}