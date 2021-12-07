const express = require('express');
const path = require('path');
const routes = require('./routes/routes');
const expressSession = require('express-session');
const { url } = require('inspector');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname+'/views');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(expressSession ({
    secret: 'wh4t3v3r',
    saveUninitialized: true,
    resave: true
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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

//app.get('/', routes.index);
//app.get('/create', routes.create);
app.get('/users', routes.getUsers);
app.get('/questionnaire', routes.getQuestionnaire);
app.post('/create', urlencodedParser, routes.createUser);
app.post('/question', urlencodedParser, routes.createQuestionnaire);
app.post('/login', urlencodedParser, routes.login);
app.get('/sendUser', routes.sendUser);
app.post('/like', urlencodedParser, routes.like);
// app.get('/edit/:id', routes.edit);
// app.post('/edit/:id', urlencodedParser, routes.editPerson);
//app.get('/delete/:id', routes.delete);
// app.get('/details/:id', routes.details);

app.listen(3000);
