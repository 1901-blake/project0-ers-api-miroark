import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config, users } from '../../config';
import { User } from '../../models/user/user';

export const authRouter = express.Router();

authRouter.post('/register', (req, res) => {// Currently only makes admins.
  const hashedPass = bcrypt.hashSync(req.body.password, 8);
  const newUser = new User(1, req.body.username, hashedPass, req.body.email,
    req.body.firstName, req.body.lastName);

    // insert into the 'Database';
    users.push(newUser);

  const token = jwt.sign({...newUser}, config.secret, {
    expiresIn: 86400
  });

  res.status(200).send({auth: true, token: token});
});

authRouter.post('/login', (req, res) => {
  const user = users[req.body.id];

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    res.status(401).send({auth: false, token: undefined, message: 'Invalid Credentials'});
  }else {

    const token = jwt.sign({...user}, config.secret, {
      expiresIn: 86400
    });

    res.status(200).send({auth: true, token: token});
  }
});