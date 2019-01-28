import { Pool } from 'pg';

export default class SessionFactory {

    static cred = {
        database: process.env.PostgreSQLDB,
        host: process.env.PostgreSQLEndpoint,
        user: process.env.PostgreSQLUser,
        password: process.env.PostgreSQLPassword,
        max: 10
    };

    static pool: Pool;

    static created = false;

    static getConnectionPool(): Pool {

        if (!this.created) {
            this.pool = new Pool(this.cred);
            this.created = true;
        }

        return this.pool;
    }

}