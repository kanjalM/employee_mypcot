import express from 'express';
import { addAttendance, emp_attend, listAttendance } from '../controller/attendController';

const attendRoute = express.Router();

attendRoute.post('/add-attendance', addAttendance);
attendRoute.get('/list-attendance', listAttendance);
attendRoute.get('/emp-attendance/:emp_id', emp_attend);

export default attendRoute;
