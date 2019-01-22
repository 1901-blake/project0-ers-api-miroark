import express from 'express';
import jwt from 'jsonwebtoken';
import { config, users } from '../../config';
import { admin } from '../../models/user/user.roles';
export const adminRouter = express.Router();

// Everything in this router is restricted to users with administrative privileges.

adminRouter.use((req, res, next) => {
    const token: any = req.headers['x-access-token'];
    if (!token) {
        res.status(400).send({auth: false, message: 'No token found!'});
    }

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            res.status(500).send({auth: false, message: 'Failed to authenticate token!'});
        }
        else if (decoded.role.id !== admin.id) {
            res.status(401).send({auth: false, message: 'User does not have administrative privleges!'});
        }
        else {
            next();
        }
    }); // end of verify
}); // end of authenticator.

adminRouter.get('/users', (req, res) => {
    res.status(200).send(users);
});