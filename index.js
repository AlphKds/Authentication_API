const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');
const { unless } = require('express-unless');
const app = express();

mongoose.Promise = global.Promise;

const connectToDB = async () => {
  try {
    await mongoose.connect(dbConfig.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.log('Database connection error:', error);
  }
};

connectToDB();

auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: '/users/login', methods: ['POST'] },
      { url: '/users/register', methods: ['POST'] },
    ],
  })
);

app.use(express.json());

app.use('/users', require('./routes/users.routes'));

app.use(errors.errorHandler);
// Default Routes 
app.get('/', (req, res) => {
    res.json('message: Hello World!');
    res.status(200);
});
exports.app = async (req, res) => {

  if (mongoose.connection.readyState !== 1) {
    await connectToDB();
  }

  app(req, res);
};