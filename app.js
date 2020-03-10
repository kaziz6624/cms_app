const express    = require('express');
const app        = express();
const path       = require('path');
const exphndlbr  = require('express-handlebars');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');  
const fileUpload = require('express-fileupload');
const session    = require('express-session');
const flash      = require('connect-flash');

mongoose.connect('mongodb://localhost:27017/cms', {useNewUrlParser: true , useUnifiedTopology: true}).then(db => {

    console.log('mongo connected');

}).catch(error => console.log(error));

// Use Static
app.use(express.static(path.join(__dirname, 'publocs')));

// Set View Engine

const {select, generateDate} = require('./helpers/handlebar-halper');

app.engine('handlebars', exphndlbr({defaultLayout: 'home', helpers: {select: select, generateDate: generateDate}}));
app.set('view engine', 'handlebars');

//upload middleware
app.use(fileUpload());

// body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//method Override

app.use(methodOverride('_method'));


app.use(session({

    secret: 'aziz',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// local variable usig middleware

app.use((req, res, next) => {

    res.locals.success_message = req.flash('success_message');
    res.locals.error_message   = req.flash('error_message');

    next();
});

// Load Routs
const home       = require('./routes/home/index');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
const admin      = require('./routes/admin/index');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               //index');
const posts      = require('./routes/admin/posts');
const categories = require('./routes/admin/categories');

// use routs
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);
app.use('/admin/categories', categories);


app.listen(3000, () => {
    console.log('server running');
    
}); 
