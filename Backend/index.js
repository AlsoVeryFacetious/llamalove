const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const { url } = require('inspector');
// var router = express.Router();
// var multer = require('multer');
// var fs = require("fs");
// var upload = multer({ dest: 'uploads/' })
// var Image = require('../models/image');
// var storage = multer.memoryStorage()
// var upload = multer({ storage: storage })

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


// GET for image form
// router.get("/questionnaire", function(req, res, next) {
//     res.render("create_image", {title: "Create Image"});
// });

// // Uploading image to mongoDB Atlas
// router.post("/image/create", upload.single("image"), function(req, res, next) {
//     var image = new Image({
//         name: req.body.image_name
//     });
//     image.img.data = fs.readFileSync(req.file.path);
//     image.img.contentType = "image/jpg";
//     image.save(function(err) {
//         if (err) { return next(err); }
//         res.redirect("/");
//     });
// });


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

//app.get('/', routes.index);
//app.get('/create', routes.create);
app.get('/users', routes.getUsers);
app.get('/questionnaire', routes.getQuestionnaire);
app.post('/create', urlencodedParser, routes.createUser);
app.post('/question', urlencodedParser, routes.createQuestionnaire);
app.post('/login', urlencodedParser, routes.login);
app.get('/sendUser', checkAuth, routes.sendUser);
app.get('/matches', checkAuth, routes.getMatches);
app.post('/like', checkAuth, urlencodedParser, routes.like);
// app.get('/edit/:id', routes.edit);
// app.post('/edit/:id', urlencodedParser, routes.editPerson);
//app.get('/delete/:id', routes.delete);
// app.get('/details/:id', routes.details);

app.listen(3000);
