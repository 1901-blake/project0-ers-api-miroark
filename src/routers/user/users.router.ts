import express from 'express';
import jwt from 'jsonwebtoken';
import { config, tickets, users } from '../../config';
import { admin, manager } from '../../models/user/user.roles';
export const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
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

usersRouter.get('/', (req, res) => {
    if (res.locals.user.role.id === admin.id || // if they're an adim
        res.locals.user.role.id === manager.id) {   // if they're a manager

        res.status(200).send(users);
    } else {
        res.status(401).send({message: 'The incoming token has expired.'});
    }
});

usersRouter.get('/:id', (req, res) => {
    if (res.locals.user.id === req.params.id || // if they're the user
        res.locals.user.role.id === admin.id || // if they're an adim
        res.locals.user.role.id === manager.id) {   // if they're a manager

        res.status(200).send(res.locals.user);
    } else {
        res.status(401).send({message: 'The incoming token has expired.'});
    }
});