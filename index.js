const functions = require('firebase-functions');
const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const {unless} = require("express-unless");
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
mongoose.Promise = global.Promise;
mongoose
    .connect(dbConfig.MONGO_URI, {
        useNewUrlParser: true,  
        useUnifiedTopology: true, 
    })
    .then(
        () => {
            console.log("Database connected");
        },
        (error) => {
            console.log("Database can't be connected: " + error);
        }
    );

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/login", methods: ["POST"] },
            { url: "/register", methods: ["POST"] },
    ],
    })
);

app.use(express.json());

app.use(require("./routes/users.routes"));

app.use(errors.errorHandler);

exports.app = functions.https.onRequest(app);
