import { Request } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/user.model';

export default class UserService {

  statusCode = 200;

  /**
   * get all users
   * @returns all users
   */
  async getAll() {
    return await User.find({})
      .then(res => {this.statusCode = 200; return res})
      .catch(err => {this.statusCode = 400; return err});
  }

  /**
   * return a specific user
   * @param id id of user
   * @returns user with the specified id
   */
  async getDetail(id:string) {
    return await User.findById(id)
      .then(res => {this.statusCode = 200; return res})
      .catch(err => {this.statusCode = 400; return err});
  }

  /**
   * creates a new user
   * @param request 
   * @returns 'success' or error
   */
  async create(request:Request) {
    const newUser = new User({
      username: request.body.username,
      password: request.body.password
    });

    return await newUser.save()
      .then(res => {this.statusCode = 200; return res})
      .catch(err => {this.statusCode = 400; return err});
  }

  /**
   * updates a user
   * @param id id of user to update
   * @param request 
   * @returns 'success' or null
   */
  async update(id:string, request:Request) {
    const updateUser = {
      username: request.body.username,
      password: request.body.password
    };
    return await User.updateOne({_id: id}, {$set: updateUser})
      .then(res => {this.statusCode = 200; return res})
      .catch(err => {this.statusCode = 400; return err});
  }

  /**
   * delets a user with id
   * @param id id of user to be deleted
   * @returns 'success' or null
   */
  async delete(id:string) {
    return await User.findOneAndDelete({_id: id})
      .then(res => {this.statusCode = 200; return res})
      .catch(err => {this.statusCode = 400; return err});
  }


  /**
   * Logs a user in
   * @param request
   * @returns jwt or null 
   */
  async login(request:Request) {
    const user:any = await User.findOne({username: request.body.username});

    this.statusCode = 200;
    if(user)
      if(user.password == request.body.password)
        return jwt.sign({username: user.username, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.PRIVATE_KEY);
    
    this.statusCode = 401;
    return null;
  }

  /**
   * Validates a jwt
   * @param request 
   * @returns returns username or null
   */
  async validate(request:Request) {
    this.statusCode = 200;
    const token = jwt.verify(request.header('Bearer'), process.env.PRIVATE_KEY);
    if(!token)
      this.statusCode = 401;
    return token;
  }
}