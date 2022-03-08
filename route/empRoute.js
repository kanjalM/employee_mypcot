import express from 'express';
import { addEmployee, idEmployee, listEmployee, removeEmployee, updateEmployee, activeEmployee, filterEmployee, listProjectManager } from '../controller/empController.js';

const empRoute = express.Router();

empRoute.post('/add-employee', addEmployee);
empRoute.get('/list-employee', listEmployee);
empRoute.get('/list-employee/:emp_id', idEmployee);
empRoute.put('/update-employee/:emp_id', updateEmployee);
empRoute.delete('/del-employee/:emp_id', removeEmployee);
empRoute.put('/active-employee/:emp_id', activeEmployee);
empRoute.get('/filter-employee/:dept_id', filterEmployee);
empRoute.get('/list-manager', listProjectManager);

export default empRoute;