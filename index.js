const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");

const {unless} = require("express-unless");
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

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
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
    ],
	})
);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
	next();
});

app.use(express.json());
app.use("/users", require("./routes/users.routes"));
app.use(errors.errorHandler);

const PORT = 4000;

app.listen(PORT , function () {
    console.log("Ready to GO!");
});

exports.authapi = app;
