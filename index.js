import express from 'express';
import cors from 'cors';
import deptRoute from './route/deptRoute.js';
import desigRoute from './route/desigRoute.js';
import empRoute from './route/empRoute.js';
import attendRoute from './route/attendRoute.js';

const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.json());
// app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/department', deptRoute);
app.use('/designation', desigRoute);
app.use('/employee', empRoute);
app.use('/attendance', attendRoute);

const directory = path.join(__dirname, '/assets');
app.use('/assets', express.static(directory));

app.listen(9000, function(){
    console.log('Node Server Started');
});