import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../../config';
import { User } from '../../models/user/user';
import { admin, manager, user } from '../../models/user/user.roles';

export const authRouter = express.Router();

// temporary array for holding Users as they register while developing.
const users = [new User(0, 'admin', bcrypt.hashSync('pass', 8), 'admin@here.com')];

authRouter.post('/register', (req, res) => {// Currently only makes admins.
  const hashedPass = bcrypt.hashSync(req.body.password, 8);
  const newUser = new User(req.body.username, hashedPass, req.body.email,
    req.body.firstName, req.body.lastName);

    // insert into the 'Database';
    users.push(newUser);

  const token = jwt.sign({id: newUser.id}, config.secret, {
    expiresIn: 86400
  });

  res.status(200).send({auth: true, token: token});
});

authRouter.post('/login', (req, res) => {

});

authRouter.get('/me', (req, res) => {
  const token: any = req.headers['x-access-token'];
  if (!token) {
    res.status(401).send({auth: false, message: 'No token provided.'});
  }

  jwt.verify(token, config.secret, (err: any, decoded: any) => {
    if (err) {
      res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
    }
    res.status(200).send(decoded);
  });
});
