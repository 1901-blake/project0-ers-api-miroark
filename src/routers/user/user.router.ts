import express from 'express';
import jwt from 'jsonwebtoken';
import { config, tickets } from '../../config';
export const userRouter = express.Router();

userRouter.use((req, res, next) => {
    const token: any = req.headers['x-access-token'];
    if (!token) {
        res.status(400).send({auth: false, message: 'No token found!'});
    }

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            res.status(500).send({auth: false, message: 'Failed to authenticate token!'});
        }
        else {
            res.locals.user = decoded;
            next();
        }
    }); // end of verify
}); // end of authenticator

userRouter.get('/my-tickets', (req, res) => {
    res.status(200).send(tickets.filter((element) => {
        return element.author === res.locals.user.id;
    }));
});