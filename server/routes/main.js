const express = require('express');

const router = express.Router();

router
    .get('/', (req, res) => {
        res.render('index', {
            title:"NodeJs Blog",
            description: "Simple Blog created with NodeJs, Express & MongoDb"
        });
    })

    .get('/about', (req, res) => {
        res.render('about');
    })

module.exports = {
    router,
}