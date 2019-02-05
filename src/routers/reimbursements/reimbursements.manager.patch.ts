import express from 'express';
import ReimbursementDao from '../../daos/reimbursement/reimbirsement.dao';

export default async function managerPatch(req: express.Request, res: express.Response) {
    // Update reimbursement with id = req.body.updated.id
    // Returns Reimbursement
    // Allowed Roles: Finanace Manager
    console.log(`${res.locals.user.username} is modifying reimbursement ${req.body.updated.id}`);
    if (!req.body.updated.id) {
        res.status(400).send({auth: false, message: 'No id provided.'});
    }
    const dao = new ReimbursementDao();

    if (req.body.updated.author) {
        try {
            dao.updateReimbursementAuthor(req.body.updated.id, req.body.updated.author);
        } catch (err) {
            res.status(500).send(err);
            throw err;
        }
    }
    if (req.body.updated.amount) {
        try {
            dao.updateReimbursementAmount(req.body.updated.id, req.body.updated.amount);
        } catch (err) {
            res.status(500).send(err);
            throw err;
        }
    }
    if (req.body.updated.dateSubmitted) {
        try {
            dao.updateReimbursementDateSubmitted(req.body.updated.id, req.body.updated.dateSubmitted);
        } catch (err) {
            res.status(500).send(err);
            throw err;
        }
    }
    if (req.body.updated.dateResolved) {
        try {
            dao.updateReimbursementDateResolved(req.body.updated.id, req.body.updated.dateResolved);
        } catch (err) {
            res.status(500).send(err);
            throw err;
        }
    }
    if (req.body.updated.description) {
        try {
            dao.updateReimbursementDescription(req.body.updated.id, req.body.updated.description);
        } catch (err) {
            res.status(500).send(err);
            throw err;
        }
    }
    if (req.body.updated.resolverId) {
        try {
            dao.updateReimbursementResolverId(req.body.updated.id, req.body.updated.resolverId);
        } catch (err) {
            res.status(500).send(err);
            throw err;
        }
    }
    if (req.body.updated.status) {
        try {
            dao.updateReimbursementStatus(req.body.updated.id, req.body.updated.status);
        } catch (err) {
            res.status(500).send(err);
            throw err;
        }
    }
    if (req.body.updated.type) {
        try {
            dao.updateReimbursementType(req.body.updated.id, req.body.updated.type);
        } catch (err) {
            res.status(500).send(err);
            throw err;
        }
    }
    try {
        const reimbursement = await dao.getReimbursementById(req.body.updated.id);
        res.status(200).send(reimbursement);
    } catch (err) {
        res.status(500).send(err);
    }
}