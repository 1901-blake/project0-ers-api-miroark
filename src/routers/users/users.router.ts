import express from 'express';
import jwt from 'jsonwebtoken';
import { admin, manager } from '../../models/user/user.roles';
import UserDao from '../../daos/user.dao';
import bcrypt from 'bcryptjs';

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

usersRouter.get('/:id', (req, res) => {
    console.log(`${res.locals.user.username} requested info for user_id ${req.params.id}`);
    console.log(res.locals.user.id);
    console.log(res.locals.user.userrole);
    console.log(admin.id);
    if (res.locals.user.id == req.params.id || // if they're the user. For some reason I need type coersion here.
        res.locals.user.userrole === admin.id || // if they're an adim
        res.locals.user.userroled === manager.id) {   // if they're a manager

        const dao = new UserDao();
        dao.getUserbyId(req.params.id).then(user => {
            res.status(200).send(user);
        })
        .catch(err => { throw err; });
    } else {
        res.status(401).send({message: 'The incoming token has expired.'});
    }
});

usersRouter.patch('/', (req, res) => {
    if (res.locals.user.userrole === admin.id) {
        console.log(`Admin is modifying user ${req.body.updated.id}`);
        if (!req.body.updated.id) {
            res.status(400).send({auth: false, message: 'No id provided.'});
        }
        const dao = new UserDao();

        if (req.body.updated.userrole) {
            dao.updateUserRole(req.body.updated.id, req.body.updated.userrole);
        }
        if (req.body.username) {
            dao.updateUserUsername(req.body.updated.id, req.body.updated.username);
        }
        if (req.body.updated.userpassword) {
            const hashedPass = bcrypt.hashSync(req.body.updated.userpassword, 8);
            dao.updateUserPassword(req.body.updated.id, hashedPass);
        }
        if (req.body.updated.email) {
            dao.updateUserEmail(req.body.updated.id, req.body.updated.email);
        }
        if (req.body.updated.firstname) {
            dao.updateUserFName(req.body.updated.id, req.body.updated.firstname);
        }
        if (req.body.updated.lastname) {
            dao.updateUserLName(req.body.updated.id, req.body.updated.lastname);
        }
        dao.getUserbyId(req.body.updated.id).then(user => {
            res.status(200).send(user);
        })
        .catch(err => { throw err; });

    } else {
        res.locals(401).send({auth: false, message: 'Invalid Credentials'});
    }
});