import express from 'express';
import bcrypt from 'bcryptjs';
import UserDao from '../../daos/user/user.dao';
import jwt from 'jsonwebtoken';

export default async function registerAuth (req: express.Request, res: express.Response) {
  // Check that all required fields have been provided.
  if (!req.body.username ) {
     res.status(400).send({auth: false, message: 'Missing username.'});
  } else if (!req.body.password) {
    res.status(400).send({auth: false, message: 'Missing password.'});
  } else if (!req.body.email) {
    res.status(400).send({auth: false, message: 'Missing email.'});
  } else if (!req.body.firstName) {
    res.status(400).send({auth: false, message: 'Missing first name.'});
  } else if (!req.body.lastName) {
    res.status(400).send({auth: false, message: 'Missing last name.'});
  }

  const hashedPass = bcrypt.hashSync(req.body.password, 8);
  const dao = new UserDao();

  try {
    const user = await dao.insertNewUser(req.body.username, hashedPass, req.body.email,
      req.body.firstName, req.body.lastName);

    const secret: any = process.env.JWTSecret;
    const token = jwt.sign({user}, secret, {expiresIn: 86400});

    res.status(200).send({auth: true, token: token, user: user});
  } catch (err) {
    res.status(500).send(err);
    throw err;
  }

}