import express from 'express';
import jwt from 'jsonwebtoken';
import { config, users } from '../../config';
export const adminRouter = express.Router();

// everything in this router is restricted to users with administrative privileges.

adminRouter.use((req, res, next) => {
    const token: any = req.headers['x-access-token'];
    if (!token) {
        res.status(400).send({auth: false, message: 'No token found!'});
    }

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            res.status(500).send({auth: false, message: 'Failed to authenticate token!'});
        }
        if (decoded.role.id !== 2) {
            res.status(401).send({auth: false, message: 'User does not have administrative privleges!'});
        }
        next();
    }); // end of verify
});

adminRouter.get('/users', (req, res) => {
    res.status(200).send(users);
});