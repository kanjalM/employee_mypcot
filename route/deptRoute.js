import express from 'express';
import { addDepartment, listDepartment } from '../controller/deptController.js';

const deptRoute = express.Router();

deptRoute.post('/add-department', addDepartment);
deptRoute.get('/list-department', listDepartment);

export default deptRoute;