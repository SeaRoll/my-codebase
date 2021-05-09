import { Router, Request, Response } from 'express';
import PostService from '../services/post.service';

const postRouter = Router();
const postService = new PostService();

postRouter.route('/').get(async (req:Request, res:Response) => {
  const posts = await postService.getAll();
  res.status(posts === null ? 400 : 200).json(posts);
});

postRouter.route('/:id').get(async (req:Request, res:Response) => {
  const post = await postService.getDetail(req.params.id);
  res.status(post === null ? 400 : 200).json(post);
});

postRouter.route('/').post(async (req:Request, res:Response) => {
  const response = await postService.create(req);
  res.status(response === null ? 400 : 200).json(response);
});

postRouter.route('/:id').patch(async (req:Request, res:Response) => {
  const response = await postService.update(req.params.id, req);
  res.status(response === null ? 400 : 200).json(response);
});

postRouter.route('/:id').delete(async (req:Request, res:Response) => {
  const response = await postService.delete(req.params.id);
  res.status(response === null ? 400 : 200).json(response);
});

export default postRouter;