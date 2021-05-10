import { Request } from 'express';
import Post from '../models/post.model';

export default class PostService {

  statusCode = 200;

  /**
   * Gets all posts
   * @returns all posts
   */
  async getAll() {
    return await Post.find({})
      .then(posts => {this.statusCode = 200; return posts})
      .catch(err => {this.statusCode = 400; return err});
  }

  /**
   * Get specific post
   * @param id id to search
   * @returns post with id
   */
  async getDetail(id:string) {
    return await Post.findById(id)
      .then(post => {this.statusCode = 200; return post})
      .catch(err => {this.statusCode = 400; return err});
  }

  /**
   * Create a post
   * @param request request from rest controller
   */
  async create(request:Request) {
    const newPost = new Post({
      title: request.body.title,
      content: request.body.content
    });

    return await newPost.save()
      .then(res => {this.statusCode = 200; return res})
      .catch(err => {this.statusCode = 400; return err});
  }

  /**
   * Update a post
   * @param id id of post to update
   * @param request request from rest controller
   */
  async update(id:string, request:Request) {
    const updatePost = {
      title: request.body.title,
      content: request.body.content
    };

    return await Post.updateOne({_id: id}, {$set: updatePost})
      .then(res => {this.statusCode = 200; return res})
      .catch(err => {this.statusCode = 400; return err});
  }

  /**
   * Delete a post
   * @param id id of post to delete
   */
  async delete(id:string) {
    return await Post.findOneAndDelete({_id: id})
      .then(res => {this.statusCode = 200; return res})
      .catch(err => {this.statusCode = 400; return err});
  }
}