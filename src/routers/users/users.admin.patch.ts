import express from 'express';
import UserDao from '../../daos/user/user.dao';
import bcrypt from 'bcryptjs';

export default async function adminPatch(req: express.Request, res: express.Response) {
    console.log(`${res.locals.user.username} is modifying user ${req.body.updated.id}`);
    console.log(res.locals.updated);
        if (!req.body.updated.id) {
            res.status(400).send({auth: false, message: 'No id provided.'});
        }
        const dao = new UserDao();

        if (req.body.updated.userrole) {
            try {
                dao.updateUserRole(req.body.updated.id, req.body.updated.userrole);
            } catch (err) {
                res.status(500).send(err);
                throw err;
            }
        }
        if (req.body.username) {
            try {
                dao.updateUserUsername(req.body.updated.id, req.body.updated.username);
            } catch (err) {
                res.status(500).send(err);
                throw err;
            }
        }
        if (req.body.updated.userpassword) {
            try {
                const hashedPass = bcrypt.hashSync(req.body.updated.userpassword, 8);
                dao.updateUserPassword(req.body.updated.id, hashedPass);
            } catch (err) {
                res.status(500).send(err);
                throw err;
        }
        }
        if (req.body.updated.email) {
            try {
                dao.updateUserEmail(req.body.updated.id, req.body.updated.email);
            } catch (err) {
                res.status(500).send(err);
                throw err;
        }
        }
        if (req.body.updated.firstname) {
            try {
                dao.updateUserFName(req.body.updated.id, req.body.updated.firstname);
            } catch (err) {
                res.status(500).send(err);
                throw err;
            }
        }
        if (req.body.updated.lastname) {
            try {
                dao.updateUserLName(req.body.updated.id, req.body.updated.lastname);
            } catch (err) {
                res.status(500).send(err);
                throw err;
            }
        }
        try {
            const user = await dao.getUserbyId(req.body.updated.id);
            res.status(200).send(user);
        } catch (err) {
            res.status(500).send(err);
            throw err;
        }

}