import SessionFactory from './session.factory';

describe('SessionFactory', () => {

    it('Creates a connection pool.', () => {
        expect(SessionFactory.created).toBe(false);
        const pool = SessionFactory.getConnectionPool();
        pool.connect().catch(err => {throw err; });
        expect(SessionFactory.created).toBe(true);
    });

    it('can fetch information from the DB', async () => {
        const pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('select * from users').catch(err => {throw err; });

        expect(result.rows[0]).toBeDefined;
    });
});