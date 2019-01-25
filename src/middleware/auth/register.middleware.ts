import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user/user';
import { users } from '../../config';

export default function registerAuth (req: express.Request, res: express.Response) {// Currently only makes admins.
  const hashedPass = bcrypt.hashSync(req.body.password, 8);
  const newUser = new User(1, req.body.username, hashedPass, req.body.email,
    req.body.firstName, req.body.lastName);

  // insert into the 'Database';
   users.push(newUser);

  const token = newUser.generateJwt();

  res.status(200).send({auth: true, token: token, user: newUser});
}