import express from 'express';
import UserDao from '../../daos/user/user.dao';
import bcrypt from 'bcryptjs';

export default function adminPatch(req: express.Request, res: express.Response) {
    console.log(`${res.locals.user.username} is modifying user ${req.body.updated.id}`);
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
}