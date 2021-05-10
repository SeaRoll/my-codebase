import { Router, Request, Response } from 'express';
import PostService from '../services/post.service';

const postRouter = Router();
const postService = new PostService();

postRouter.route('/').get(async (req:Request, res:Response) => {
  res.status(postService.statusCode).json(await postService.getAll());
});

postRouter.route('/:id').get(async (req:Request, res:Response) => {
  res.status(postService.statusCode).json(await postService.getDetail(req.params.id));
});

postRouter.route('/').post(async (req:Request, res:Response) => {
  res.status(postService.statusCode).json(await postService.create(req));
});

postRouter.route('/:id').patch(async (req:Request, res:Response) => {
  res.status(postService.statusCode).json(await postService.update(req.params.id, req));
});

postRouter.route('/:id').delete(async (req:Request, res:Response) => {
  res.status(postService.statusCode).json(await postService.delete(req.params.id));
});

export default postRouter;