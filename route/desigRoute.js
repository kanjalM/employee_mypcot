import express from 'express';
import { addDesignation, listDesignation, desigDepartment  } from '../controller/desigController';

const desigRoute = express.Router();

desigRoute.post('/add-designation', addDesignation);
desigRoute.get('/list-designation', listDesignation);
desigRoute.get('/list-desig/:dept_id', desigDepartment);

export default desigRoute;