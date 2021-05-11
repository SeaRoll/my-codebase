import { Request, response, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

export default class UserService {

  /**
   * creates a new user
   * @param request 
   * @returns 'success' or error
   */
  async create(req:Request, res:Response) {

    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS, 10));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email || null,
      role: 0,
      group: null,
      password: hashedPassword
    });

    return await newUser.save()
      .then(user => { return res.status(200).json(user) })
      .catch(err => { return res.status(500).json('error: ' + err) });
  }

  /**
   * Logs a user in
   * @param request
   * @returns wrong messages
   */
  async login(req:Request, res:Response) {
    const user:any = await User.findOne({username: req.body.username});

    if(!user) {
      return res.status(401).json('error: no user exists');
    }

    const passwordResult = await bcrypt.compare(req.body.password, user.password);
    if(!passwordResult) {
      return res.status(403).json('error: invalid password');
    }
    
    const token = await jwt.sign({id: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.PRIVATE_KEY);
    return res.status(200).json(token);
  }

  /**
   * Validates jwt and returns user data without password
   * @param request 
   * @returns 
   */
  async detail(req:Request, res:Response) {
    const token:any = await this.validate(req);
    if(!token)
      return res.status(403).json('error: invalid token');

    return await User.findById(token.id, {password: 0, createdAt: 0, updatedAt: 0, _id: 0, __v: 0})
      .then((user:any) => { return res.status(200).json(user) })
      .catch(err => { return res.status(500).json('error: ' + err) });
  }

  /**
   * Delete a user
   * @param req 
   * @param res 
   * @returns 'user deleted', or 'error' + err
   */
  async delete(req:Request, res:Response) {
    const token:any = await this.validate(req);
    if(!token)
      return res.status(403).json('error: invalid token');

    return await User.findByIdAndDelete(token.id)
      .then(() => { return res.status(200).json('user deleted') })
      .catch(err => { return res.status(500).json('error: ' + err) });
  }

  /**
   * Validates a jwt
   * @param request 
   * @returns returns username or null
   */
  async validate(request:Request) {
    const token = jwt.verify(request.header('Bearer'), process.env.PRIVATE_KEY);
    return token;
  }
}