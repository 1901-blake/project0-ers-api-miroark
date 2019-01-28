import express from 'express';
import jwt from 'jsonwebtoken';
import { admin, manager } from '../../models/user/user.roles';
import UserDao from '../../daos/user.dao';

const usersRouter = express.Router();
export default usersRouter;

usersRouter.use((req, res, next) => {
    const token: any = req.headers['x-access-token'];
    if (!token) {
        res.status(400).send({auth: false, message: 'No token found!'});
    }

    const secret: any = process.env.JWTSecret;
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            console.log(err);
            res.status(500).send({auth: false, message: 'Failed to authenticate token!'});
        }
        else {
            res.locals.user = decoded.user;
            next();
        }
    }); // end of verify
}); // end of authenticator

usersRouter.get('/', (req, res) => {
    console.log(`${res.locals.user.username} requested all users.`);
    if (res.locals.user.userrole === manager.id ||
        res.locals.user.userrole === admin.id) {
        // Get all users, then send all users.

        const dao = new UserDao();
        dao.getAllUsers().then(users => {
            res.status(200).send(users);
        });
    } else {
        res.status(401).send({auth: false, message: 'Invalid Credentials'});
    }
});

usersRouter.patch('/', (req, res) => {
    if (res.locals.user.role.id === admin.id) {
        // Update user by id with given information.
    } else {
        res.locals(401).send({auth: false, message: 'Invalid Credentials'});
    }
});

usersRouter.get('/:id', (req, res) => {
    console.log(`${res.locals.user.username} requested info for user_id ${req.params.id}`);
    if (res.locals.user.id == req.params.id || // if they're the user. For some reason I need type coersion here.
        res.locals.user.role.id === admin.id || // if they're an adim
        res.locals.user.role.id === manager.id) {   // if they're a manager

        const dao = new UserDao();
        res.status(200).send(dao.getUserbyId(req.params.id));
    } else {
        res.status(401).send({message: 'The incoming token has expired.'});
    }
});