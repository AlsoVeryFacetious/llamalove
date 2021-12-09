const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const { url } = require('inspector');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename)
    }
});

var upload = multer({ storage: storage });

function middleware(req, res, next) {
    var imageName;

    var uploadStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads');
        },
        filename: function (req, file, cb) {
            imageName = file.originalname;
            //imageName += "_randomstring"
            cb(null, imageName);
        }
    });

    var uploader = multer({storage: uploadStorage});

    var uploadFile = upload.single('image');

    uploadFile(req, res, function (err) {
        req.imageName = imageName;
        req.uploadError = err;
        next();
    })
}


const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(expressSession ({
    secret: 'wh4t3v3r',
    saveUninitialized: true,
    resave: true,
    // cookie: {
    //     //path: '/',
    //     //domain: 'localhost',
    //     //maxAge: 1000 * 60 * 24,
    //     sameSite: 'none',
    //     secure: true // 24 hours
    // }
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});



const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

const urlencodedParser = express.urlencoded({
    extended: false
});


app.get('/users', routes.getUsers);
app.get('/questionnaire', routes.getQuestionnaire);
app.post('/create', urlencodedParser, routes.createUser);
app.post('/question', middleware, urlencodedParser, routes.createQuestionnaire);
app.post('/login', urlencodedParser, routes.login);
app.get('/sendUser', checkAuth, routes.sendUser);
app.get('/matches', checkAuth, routes.getMatches);
app.post('/like', checkAuth, urlencodedParser, routes.like);

app.listen(3000);
// app.listen(process.env.PORT || 3000);
