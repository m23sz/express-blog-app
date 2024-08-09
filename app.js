require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore =  require('connect-mongo');

const { connectDB } = require('./server/config/db');
const { router } = require('./server/routes/main');
const { adminRouter } = require('./server/routes/admin');

const app = express();
const PORT= 5000 || process.env.PORT;

// Connect to DB
connectDB();

const { isActiveRoute } = require('./server/helpers/routeHelpers');

//Midlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    //cookie: {maxAge: new Date ( Date.now() + (36000000))}
    //Date/now() - 30 * 24 * 60 *60 * 1000
}));

//Templating Engine
app.use(expressLayout);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');


app.locals.isActiveRoute = isActiveRoute;


//Routes
app.use('/', router)
app.use('/', adminRouter)


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})