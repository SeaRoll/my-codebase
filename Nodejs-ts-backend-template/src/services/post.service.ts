import Post from '../models/post.model';

export default class PostService {

  /**
   * Gets all posts
   * @returns all posts
   */
  async getAll() {
    const posts = await Post.find({});
    return posts;
  }

  /**
   * Get specific post
   * @param id id to search
   * @returns post with id
   */
  async getDetail(id:string) {
    const post = await Post.findById(id);
    return post;
  }

  /**
   * Create a post
   * @param request request from rest controller
   */
  async create(request:any) {
    const newPost = new Post({
      title: request.body.title,
      content: request.body.content
    });

    const postSave = await newPost.save();
    return (postSave !== null ? 'success' : null);
  }

  /**
   * Update a post
   * @param id id of post to update
   * @param request request from rest controller
   */
  async update(id:string, request:any) {
    const updatePost = {
      title: request.body.title,
      content: request.body.content
    };

    const postUpdate = await Post.updateOne({_id: id}, {$set: updatePost});
    return (postUpdate !== null ? 'success' : null);
  }

  /**
   * Delete a post
   * @param id id of post to delete
   */
  async delete(id:string) {
    const postDelete = await Post.findOneAndDelete({_id: id});
    return (postDelete !== null ? 'success' : null);
  }
}