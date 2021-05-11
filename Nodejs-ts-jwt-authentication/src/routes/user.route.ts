import { Router, Request, Response } from 'express';
import UserService from '../services/user.service';

const userRouter = Router();
const userService = new UserService();

userRouter.route('/').post(async (req:Request, res:Response) => {
  await userService.create(req, res);
});

userRouter.route('/auth/login').post(async (req:Request, res:Response) => {
  await userService.login(req, res);
});

userRouter.route('/auth/').get(async (req:Request, res:Response) => {
  await userService.detail(req, res);
});

userRouter.route('/auth/delete').get(async (req:Request, res:Response) => {
  await userService.delete(req, res);
});

export default userRouter;