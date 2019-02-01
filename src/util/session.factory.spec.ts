import SessionFactory from './session.factory';

describe('SessionFactory', () => {

    it('Creates a connection pool.', async () => {
        expect(SessionFactory.created).toBe(false);
        const pool = SessionFactory.getConnectionPool();
        const client = await pool.connect().catch(err => {throw err; });
        expect(client).toBeDefined;
        client.release();
        expect(SessionFactory.created).toBe(true);
    });

    it('can fetch information from the DB', async () => {
        const pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('select * from users')
        .catch(err => {console.log(err); throw err; });

        const entry = result.rows;
        expect(entry).toBeDefined;
    }, 30000);

});