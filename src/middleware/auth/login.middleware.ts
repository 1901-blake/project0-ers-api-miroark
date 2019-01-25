import express from 'express';
import bcrypt from 'bcryptjs';
import { users } from '../../config';

export default function loginAuth(req: express.Request, res: express.Response) {
    const user = users[req.body.id];

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      res.status(401).send({auth: false, token: undefined, message: 'Invalid Credentials'});
    } else {

      const secret: any = process.env.ERS_SECRET;
      const token = user.generateJwt();

      res.status(200).send({auth: true, token: token, user: user});
    }
  }