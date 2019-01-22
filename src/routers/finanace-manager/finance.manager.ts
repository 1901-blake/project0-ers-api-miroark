import express from 'express';
import jwt from 'jsonwebtoken';
import { config, tickets } from '../../config';
import { manager } from '../../models/user/user.roles';
export const financeManagerRouter = express.Router();

// Everything in this router is restricted to users with finance manager privileges

financeManagerRouter.use((req, res, next) => {
    const token: any = req.headers['x-access-token'];
    if (!token) {
        res.status(400).send({auth: false, message: 'No token found!'});
    }

    jwt.verify(token, config.secret, (err: any, decoded: any) => {
        if (err) {
            res.status(500).send({auth: false, message: 'Failed to authenticate token!'});
        }
        else if (decoded.role.id !== manager.id) {
            res.status(401).send({auth: false, message: 'User does not have financial manager privleges!'});
        }
        else {
            next();
        }
    }); // end of verify
}); // end of authenticator

financeManagerRouter.get('/tickets', (req, res) => {
    res.status(200).send(tickets);
});