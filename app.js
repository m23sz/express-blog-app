require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const { connectDB } = require('./server/config/db');
const { router } = require('./server/routes/main');

const app = express();
const PORT= 5000 || process.env.PORT;

// Connect to DB
connectDB();

//Midlewares
app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})