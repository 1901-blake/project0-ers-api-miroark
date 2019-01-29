import express from 'express';
import ReimbursementDao from '../../daos/reimbursement/reimbirsement.dao';

export default function managerPatch(req: express.Request, res: express.Response) {
    // Update reimbursement with id = req.body.updated.id
    // Returns Reimbursement
    // Allowed Roles: Finanace Manager
    console.log(`${res.locals.user.username} is modifying reimbursement ${req.body.updated.id}`);
    if (!req.body.updated.id) {
        res.status(400).send({auth: false, message: 'No id provided.'});
    }
    if (req.body.updated.author) {

    }
    if (req.body.updated.amount) {

    }
    if (req.body.updated.dateSubmitted) {

    }
    if (req.body.updated.dateResolved) {

    }
    if (req.body.updated.description) {

    }
    if (req.body.updated.resolverId) {

    }
    if (req.body.updated.status) {

    }
    if (req.body.updated.type) {

    }
}