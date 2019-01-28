import User from '../models/user/user';
import SessionFactory from '../util/session.factory';

export default class UserDao {
    public async getAllUsers(): Promise<User[]> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        const result = await client.query('SELECT * from users')
        .catch(err => {throw err; });

        client.release();

        return result.rows;
    }

    public async getUserbyId(id: number): Promise<User> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch((err) => {throw err; });

        const result = await client.query('SELECT * from users where id = ($1)', [id])
        .catch(err => {throw err; });

        client.release();

        return result.rows[0];
    }

    public async getUserbyUsername(username: string): Promise<User> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch((err) => {throw err; });

        const result = await client.query('SELECT * from users where username = ($1)', [username])
        .catch(err => {throw err; });

        client.release();

        return result.rows[0];
    }

    public async insertNewUser(username: string, userpassword: string, email: string,
        firstname: string, lastname: string): Promise<number> {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect().catch(err => {throw err; });

        await client.query(
            'insert into users (userrole, username, userpassword, email, firstname, lastname) values (($1), ($2), ($3), ($4), ($5), ($6))',
            [1, username, userpassword, email, firstname, lastname])
            .catch((err) => {throw err; });

        const result = await client.query('select id from users where username = ($1)', [username])
        .catch((err) => {throw err; });

        client.release();

        return result.rows[0].id;
    }
}