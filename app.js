// Core Modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const http = require("http");
require("dotenv").config();
const { connectToMongodb } = require("./db/db");

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require("./routes/usersRouter");
const employeRouter = require("./routes/employeRouter");
const demandecongeRouter = require("./routes/demandecongeRouter");
const congeRouter = require("./routes/congeRouter");
const jourferieRouter = require("./routes/jourferieRouter");
const candidatRouter = require("./routes/candidatRouter");
const ficheentretientRouter = require("./routes/ficheentretientRouter");
const rendezvousRouter = require("./routes/rendezvousRouter");
const carriereRouter = require("./routes/carriereRoutes");


const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.options('*', cors({
  origin: "http://localhost:3000",
  
  credentials: true
}));


// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);
app.use("/users", usersRouter);
app.use("/employe", employeRouter);
app.use("/demandeconge", demandecongeRouter);
app.use("/conge", congeRouter);
app.use("/jourferie", jourferieRouter);
app.use("/candidat", candidatRouter);
app.use("/ficheentretient", ficheentretientRouter);
app.use("/rendezvous", rendezvousRouter);
app.use("/carriere", carriereRouter);



app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({ error: err.message });
});

const server = http.createServer(app);
server.listen(process.env.port || 5000, () => {
  connectToMongodb();
  console.log("✅ App is running on port", process.env.port || 5000);
});

module.exports = app;
