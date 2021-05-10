import { Router, Request, Response } from 'express';
import UserService from '../services/user.service';

const userRouter = Router();
const userService = new UserService();

userRouter.route('/').get(async (req:Request, res:Response) => {
  res.status(userService.statusCode).json(await userService.getAll());
});

userRouter.route('/:id').get(async (req:Request, res:Response) => {
  res.status(userService.statusCode).json(await userService.getDetail(req.params.id));
});

userRouter.route('/').post(async (req:Request, res:Response) => {
  res.status(userService.statusCode).json(await userService.create(req));
});

userRouter.route('/:id').patch(async (req:Request, res:Response) => {
  res.status(userService.statusCode).json(await userService.update(req.params.id, req));
});

userRouter.route('/:id').delete(async (req:Request, res:Response) => {
  res.status(userService.statusCode).json(await userService.delete(req.params.id));
});

userRouter.route('/auth/login').post(async (req:Request, res:Response) => {
  res.status(userService.statusCode).json(await userService.login(req));
});

userRouter.route('/auth/validate').get(async (req:Request, res:Response) => {
  res.status(userService.statusCode).json(await userService.validate(req));
});

export default userRouter;