import User from '../../models/user/user';
import SessionFactory from '../../util/session.factory';

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

        const client = await pool.connect()
        .catch(err => {throw err; });

        const result = await client.query(
            'insert into users (userrole, username, userpassword, email, firstname, lastname) values (($1), ($2), ($3), ($4), ($5), ($6)) returning *',
            [1, username, userpassword, email, firstname, lastname])
            .catch((err) => {throw err; });

        client.release();

        return result.rows[0].id;
    }

    public async updateUserRole(id: number, role: number) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update users set userrole = ($1) where id = ($2)', [role, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateUserUsername(id: number, username: string) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update users set username = ($1) where id = ($2)', [username, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateUserPassword(id: number, password: string) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update users set userpassword = ($1) where id = ($2)', [password, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateUserEmail(id: number, email: string) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update users set email = ($1) where id = ($2) ', [email, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateUserFName(id: number, fName: string) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update users set firstname = ($1) where id = ($2)', [fName, id])
        .catch(err => {throw err; });

        client.release();
    }

    public async updateUserLName(id: number, lName: string) {
        const pool = SessionFactory.getConnectionPool();

        const client = await pool.connect()
        .catch(err => {throw err; });

        await client.query('update users set firstname = ($1) where id = ($2)', [lName, id])
        .catch(err => {throw err; });

        client.release();
    }
}