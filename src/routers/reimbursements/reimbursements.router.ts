import express from 'express';
import jwt from 'jsonwebtoken';
import { manager, admin } from '../../models/user/user.roles';
import ReimbursementDao from '../../daos/reimbursement/reimbirsement.dao';
import managerPatch from './reimbursements.manager.patch';

const reimbursementsRouter = express.Router();
export default reimbursementsRouter;

reimbursementsRouter.use((req, res, next) => {
    const token: any = req.headers['x-access-token'];
    if (!token) {
        res.status(400).send({auth: false, message: 'No token found!'});
    }

    const secret: any = process.env.JWTSecret;
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            console.log(err);
            res.status(500).send({auth: false, message: 'Failed to authenticate token!'});
        } else {
            res.locals.user = decoded.user;
            next();
        }
    }); // end of verify
}); // end of authenticator

reimbursementsRouter.get('/', async (req, res) => {
    if (res.locals.user.role === manager.id || res.locals.user.role === admin.id) {
        const dao = new ReimbursementDao();
        try {
            const reimbursements = await dao.getAllReimbursements();
            res.status(200).send(reimbursements);
        } catch (err) {
            res.status(500).send({message: 'Unknown error occured'});
            throw err;
        }
    } else {
        res.status(401).send({auth: false, message: 'The incoming token has expired.'});
    }
}) ;

reimbursementsRouter.get('/status/:statusId', async (req, res) => {
    if (res.locals.user.role === manager.id || res.locals.user.role === admin.id) {
        if (!req.params.statusId) {
            res.status(400).send({message: 'No status provided'});
        } else {
            const dao = new ReimbursementDao();
            try {
                const reimbursements = await dao.getReimbursementsByStatus(req.params.statusId);
                res.status(200).send(reimbursements);
            } catch (err) {
                res.status(500).send({message: 'Unknown Error Occured'});
                throw err;
            }
        }
    } else {
        res.status(401).send({auth: false, message: 'The incoming token has expired.'});
    }
});

reimbursementsRouter.get('/author/userId/:userId', async (req, res) => {
    console.log(res.locals.user.id);
    console.log(req.params.userId);
    if (res.locals.user.role === manager.id ||
        res.locals.user.role === admin.id ||
        res.locals.user.id == req.params.userId) {
        if (!req.params.userId) {
            res.status(400).send({message: 'No User Id provided'});
        } else {
            const dao = new ReimbursementDao();
            try {
                const reimbursements = await dao.getReimbursementsByAuthorId(req.params.userId);
                res.status(200).send(reimbursements);
            } catch (err) {
                res.status(500).send({message: 'Unknown Error Occured'});
                throw err;
            }
        }
    } else {
        res.status(401).send({auth: false, message: 'The incoming token has expired.'});
    }
});

reimbursementsRouter.post('/', async (req, res) => {
    console.log(`${res.locals.user.username} inserting new reimbursement...`);
    if (!req.body.reimbursement.author) {
        res.status(400).send({message: 'No author for reimbsrsement provided'});
    }
    else if (!req.body.reimbursement.amount) {
        res.status(400).send({message: 'No amount for reimbursement provided'});
    }
    else if (!req.body.reimbursement.datesubmitted) {
        res.status(400).send({mesage: 'No datesubmitted for reimbursement provided'});
    }
    else if (!req.body.reimbursement.description) {
        res.status(400).status(400).send({message: 'No description for reimbursement provided'});
    }
    else if (!req.body.reimbursement.type) {
        res.status(400).send({message: 'No type for reimbursement provided'});
    }
    else {
        const dao = new ReimbursementDao();
        try {
            console.log('Trying to insert data to db...');

            const reimbursement = await dao.insertNewReimbursement(
                req.body.reimbursement.author, req.body.reimbursement.amount,
                req.body.reimbursement.datesubmitted, req.body.reimbursement.description,
                req.body.reimbursement.type);

            res.status(201).send(reimbursement);
        }
        catch (err) {
            console.log('Sending error...');
            res.status(500).send({message: 'Unknown error has occured'});
            throw err;
        }
    }
});

reimbursementsRouter.patch('/', (req, res) => {
    if (res.locals.user.role === admin.id) {
        managerPatch(req, res);
    } else {
        res.status(401).send({auth: false, message: 'Invalid Credentials'});
    }
});