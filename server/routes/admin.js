const express = require('express');
const adminRouter = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layout/admin';

/**
 * GET /
 * Admin - Login Page 
 */

adminRouter

    .get('/admin', async (req, res) => {
        try {
            const locals = {
                title:"Admin",
                description: "Simple Blog created with NodeJs, Express & MongoDb",
            }

            res.render('admin/index', { locals, layout: adminLayout },
        );
        } catch(error) {
            console.log(error);
        }
    })

/**
 * POST /
 * Admin - Check Login
 */

    .post('/admin', async (req, res) => {
        try {
            const { username, password } = req.body;

            if(req.body === 'admin' && req.body.password === 'password') {
                res.send('logged in');
            } else {
                res.send('Wrong username or password')
            }

        } catch (error) {
            console.log(error);
        }
    })


/**
 * POST /
 * Admin - Register
 */

    .post('/register', async (req, res) => {
        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            try {
                const user = await User.create({ username, password: hashedPassword  })
                res.status(201).json({message: 'User Created', user});
            } catch (error) {
                if(error.code === 11000) {
                    res.status(409).json({ message: 'User already in use' })
                }
                res.status(500).json({message: 'Internal server error'})
            }
          

        } catch (error) {
            console.log(error);
        }
    })


module.exports = {
    adminRouter,
}

