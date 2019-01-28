import express from 'express';
import bcrypt from 'bcryptjs';
import UserDao from '../../daos/user.dao';
import jwt from 'jsonwebtoken';

export default function registerAuth (req: express.Request, res: express.Response) {
  const hashedPass = bcrypt.hashSync(req.body.password, 8);
  const dao = new UserDao();

  dao.insertNewUser(req.body.username, hashedPass, req.body.email,
    req.body.firstName, req.body.lastName)
    .catch ((err) => {
      throw err;
    }).then(returnedIndex => {
      dao.getUserbyId(returnedIndex).then( newUser => {
        const secret: any = process.env.JWTSecret;
        const token = jwt.sign({newUser}, secret, {expiresIn: 86400});

        res.status(200).send({auth: true, token: token, user: newUser});
        }
      ).catch( err => {throw err; });
    });
}