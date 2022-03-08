import express from 'express';
import cors from 'cors';
import deptRoute from './route/deptRoute.js';
import desigRoute from './route/desigRoute.js';
import empRoute from './route/empRoute.js';
import attendRoute from './route/attendRoute.js';
import userRoute from './route/userRoute.js';

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require('path');

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Your_Secret_Key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());

app.use('/user', userRoute);
app.use('/department', deptRoute);
app.use('/designation', desigRoute);
app.use('/employee', empRoute);
app.use('/attendance', attendRoute);

const directory = path.join(__dirname, '/assets');
app.use('/assets', express.static(directory));

const PORT = process.env.PORT || 9000

app.listen(PORT, function(){
    console.log('Node Server Started');
});