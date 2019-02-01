import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routers/users/users.router';
import registerAuth from './middleware/auth/register.middleware';
import loginAuth from './middleware/auth/login.middleware';
import requestLogger from './middleware/loggers/request.logger.middleware';
import reimbursementsRouter from './routers/reimbursements/reimbursements.router';
import SessionFactory from './util/session.factory';

const app = express();

app.get('/', (req, res) => {
    res.send(SessionFactory.cred);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', String(req.headers.origin));
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(bodyParser.json());
app.use(requestLogger.bind(requestLogger));
app.post('/register', registerAuth.bind(registerAuth));
app.post('/login', loginAuth.bind(loginAuth));
app.use('/users', usersRouter);
app.use('/reimbursements', reimbursementsRouter);

app.listen(3000, () => console.log('Server started on port 3000'));
