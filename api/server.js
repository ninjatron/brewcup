const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
// https://12factor.net/config
dotenv.config();

const userRoutes = require('./routes/user');
const teaRoutes = require('./routes/tea');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

//logger middleware
// app.use((req, res, next) => {
//   console.log(req);
//   next();
// });

// app.use((req, res, next) => {
//   // we will set CORS stuff here later
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });

// ROUTES
app.use(userRoutes);
app.use("/tea", teaRoutes);
app.use("/auth", authRoutes);
app.use(reviewRoutes);

// error handler
app.use(function (error, req, res, next) {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data
  });
})

mongoose.connect(process.env.DB, { useNewUrlParser: true })
  .then(app.listen(8000))
  .catch(err => console.log(err));
  