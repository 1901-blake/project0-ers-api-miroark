import Reimbursement from '../../models/reimbursement/reimbursement';
import SessionFactory from '../../util/session.factory';

export default class ReimbursementDao {
    public async getAllReimbursements(): Promise<Reimbursement[]> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        const result = await client.query('select * from reimbursements')
        .catch(err => {throw err; });

        client.release();

        return result.rows.map(entry => {
            return {
                reimbursementId  : entry['id'],
                author : entry['author'],
                amount : entry['amount'],
                dateSubmitted : entry['dateSubmitted'],
                dateResolved : entry['dateresolved'],
                description : entry['description'],
                resolver : entry['resolver'],
                status : entry['status'],
                type : entry['reimbursementype']
            };
        });
    }

    public async getReimbursementsByStatus(status: number): Promise<Reimbursement[]> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        const result = await client.query('select * from reimbursements where status = ($1)', [status])
        .catch(err => {throw err; });

        client.release();

        return result.rows.map(entry => {
            return {
                reimbursementId  : entry['id'],
                author : entry['author'],
                amount : entry['amount'],
                dateSubmitted : entry['dateSubmitted'],
                dateResolved : entry['dateresolved'],
                description : entry['description'],
                resolver : entry['resolver'],
                status : entry['status'],
                type : entry['reimbursementype']
            };
        });
    }

    public async getReimbursementsByAuthorId(author: number): Promise<Reimbursement[]> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        const result = await client.query('select * from reimbursements where author = ($1)', [author])
        .catch(err => {throw err; });

        client.release();

        return result.rows.map((entry): Reimbursement => {
            return {
                reimbursementId  : entry['id'],
                author : entry['author'],
                amount : entry['amount'],
                dateSubmitted : entry['dateSubmitted'],
                dateResolved : entry['dateresolved'],
                description : entry['description'],
                resolver : entry['resolver'],
                status : entry['status'],
                type : entry['reimbursementype']
            };
        });
    }

    public async getReimbursementById(id: number): Promise<Reimbursement> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        const result = await client.query('select * from reimbursements where author = ($1)', [id])
        .catch(err => {throw err; });

        client.release();

        return result.rows.map((entry): Reimbursement => {
            return {
                reimbursementId  : entry['id'],
                author : entry['author'],
                amount : entry['amount'],
                dateSubmitted : entry['dateSubmitted'],
                dateResolved : entry['dateresolved'],
                description : entry['description'],
                resolver : entry['resolver'],
                status : entry['status'],
                type : entry['reimbursementype']
            };
        })[0];
    }

    public async insertNewReimbursement
    (author: string, amount: number, dateSubmitted: string, description: string, type: number): Promise<Reimbursement> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect();

        const result = await client.query(
            'insert into reimbursements (author, amount, datesubmitted, description, status, reimbursementtype) values (($1), ($2), to_timestamp(($3), \'YYYY-MM-DD HH24:MI:SS\'), ($4), ($5), ($6)) returning *',
            [author, amount, dateSubmitted, description, 1, type]) // Inserts 1 because it's pending approval.
        .catch(err => {throw err; });

        client.release();

        return result.rows.map(entry => {
            return {
                reimbursementId  : entry['id'],
                author : entry['author'],
                amount : entry['amount'],
                dateSubmitted : entry['dateSubmitted'],
                dateResolved : entry['dateresolved'],
                description : entry['description'],
                resolver : entry['resolver'],
                status : entry['status'],
                type : entry['reimbursementype']
            };
        })[0];
    }

    public async updateReimbursementAuthor(id: number, author: string) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update reimbursements set author = ($1) where id = ($2)', [author, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateReimbursementAmount(id: number, amount: number) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update reimbursements set amount = ($1) where id = ($2)', [amount, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateReimbursementDateSubmitted(id: number, dateSubmitted: string) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update reimbursements set datesubmitted = to_timestamp(($1), \'YYYY-MM-DD HH24:MI:SS\') where id = ($2)', [dateSubmitted, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateReimbursementDateResolved(id: number, dateResolved: string) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update reimbursements set dateresolved = to_timestamp(($1), \'YYYY-MM-DD HH24:MI:SS\') where id = ($2)', [dateResolved, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateReimbursementDescription(id: number, description: string) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update reimbursements set description = ($1) where id = ($2)', [description, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateReimbursementResolverId(id: number, resolverId: number) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update reimbursements set resolver = ($1) where id = ($2)', [resolverId, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateReimbursementStatus(id: number, status: number) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update reimbursements set status = ($1) where id = ($2)', [status, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateReimbursementType(id: number, type: number) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update reimbursements set type = ($1) where id = ($2)', [type, id])
        .catch(err => {throw err; });

        client.release();
    }
}