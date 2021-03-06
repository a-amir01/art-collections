const express = require('express');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());

const mongoose = require('mongoose');

const options = {
    useMongoClient: true
};
mongoose.Promise = global.Promise;

/*
 With `useMongoClient`, `mongoose.connect()` returns a thenable
 http://thecodebarbarian.com/mongoose-4.11-use-mongo-client.html
 https://github.com/Automattic/mongoose/issues/5399
 * */

console.log("env", process.env.NODE_ENV);
// if(process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://demouser:demo@ds139964.mlab.com:39964/eli-collections', options);
// }else {
//     mongoose.connect('mongodb://localhost:27017/art-collection', options);
// }


const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDb - connection error: '));

// https://www.npmjs.com/package/connect-mongo
const sess = {
    secret: "elirazani",  //used to sign session id cookie
    saveUninitialized: false,  //only if cart is updated
    resave: false, //session wont be resaved if it didnt change
    //TODO: set secure to true over https
    cookie: {maxAge: 60000 * 60 * 48, secure: false}, //1 min * 60 min * 48 hrs
    //ttl: 2 days
    store: new mongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60}),
    // genid: function(req) {
    //     return genuuid() // use UUIDs for session IDs
    // },
    name: "shopping-cart",

};

//set up session
app.use(session(sess));

const index = require('./routes/index');
// const gallery = require('./routes)
const fileUpload = require('./routes/fileUpload');
// const users = require('./routes/users');

app.use('/api', index);
app.use('/file', fileUpload);
// app.use('/users', users);

/*If you have your node.js behind a proxy and are using secure: true,
 *you need to set "trust proxy" in express*/
if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
    app.use(express.static('client/build'));

    const path = require('path');

    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}else{
    sess.cookie.secure = false;
}

app.listen(process.env.PORT || 3001, (err)=>{
    if(err) return conssole.log(err);

    console.log("API server running on port 3001\n\n")
});

module.exports = app;
