import { Router, Request, Response } from 'express'
import { IPost } from './post.struct'
import Post from './post.model'

const postRouter = Router()

postRouter.route('/').get((req:Request, res:Response) => {
  Post.find({})
    .then((posts:IPost[]) => {
      res.json({ data: posts })
    })
    .catch((err:any) => {
      res.status(500).json({ message: '' + err })
    })
})

postRouter.route('/:id').get((req:Request, res:Response) => {
  Post.findById(req.params.id)
    .then((post:IPost) => {
      res.json({ data: post })
    })
    .catch((err:any) => {
      res.status(500).json({ message: '' + err })
    })
})

postRouter.route('/').post((req:Request, res:Response) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content
  })

  newPost.save()
    .then(() => {
      res.json({ success: true })
    })
    .catch((err:any) => {
      res.status(500).json({ message: '' + err })
    })
})

postRouter.route('/:id').patch(async (req:Request, res:Response) => {
  const updatePost = {
    title: req.body.title,
    content: req.body.content
  }

  Post.updateOne({ _id: req.params.id }, { $set: updatePost })
    .then(() => {
      res.json({ success: true })
    })
    .catch((err:any) => {
      res.status(500).json({ message: '' + err })
    })
})

postRouter.route('/:id').delete(async (req:Request, res:Response) => {
  Post.findOneAndDelete({ _id: req.params.id })
    .then(() => {
      res.json({ success: true })
    })
    .catch((err:any) => {
      res.status(500).json({ message: '' + err })
    })
})

export default postRouter
