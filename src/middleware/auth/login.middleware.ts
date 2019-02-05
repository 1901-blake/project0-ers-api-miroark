import express from 'express';
import bcrypt from 'bcryptjs';
import UserDao from '../../daos/user/user.dao';
import jwt from 'jsonwebtoken';

export default async function loginAuth(req: express.Request, res: express.Response) {
  const dao = new UserDao();

  try {
    const user = await dao.getUserbyUsername(req.body.username);
    if (!user) {
      console.log(`Cannot find user ${req.body.username} in database!`);
      res.status(422).send({auth: false, token: undefined, message: 'Bad Username'});
    }
    else {
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        console.log(`Invalid password provided for user ${req.body.username}`);
        res.status(422).send({auth: false, token: undefined, message: 'Bad Password'});
      } else {
        const secret: any = process.env.JWTSecret;
        const token = jwt.sign({user}, secret, {expiresIn: 86400});

        res.status(200).send({auth: true, token: token, user: user});
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}