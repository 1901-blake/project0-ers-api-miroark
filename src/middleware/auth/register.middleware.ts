import express from 'express';
import bcrypt from 'bcryptjs';
import UserDao from '../../daos/user.dao';
import jwt from 'jsonwebtoken';

export default function registerAuth (req: express.Request, res: express.Response) {
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

  dao.insertNewUser(req.body.username, hashedPass, req.body.email,
    req.body.firstName, req.body.lastName)
    .then(returnedIndex => {
      dao.getUserbyId(returnedIndex).then( newUser => {
        const secret: any = process.env.JWTSecret;
        const token = jwt.sign({newUser}, secret, {expiresIn: 86400});

        res.status(200).send({auth: true, token: token, user: newUser});
        }
      ).catch( err => {throw err; });
    }).catch ((err) => {throw err; });
    res.status(500).send({auth: false, message: 'Unknown Error Occured.'});
}