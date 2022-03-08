import express from 'express';
import { addUser, userLogin, userLogout } from '../controller/userController.js';

const userRoute = express.Router();

userRoute.post('/user-registration', addUser);
userRoute.post('/user-login', userLogin)
userRoute.get('/user-logout', userLogout)

export default userRoute;