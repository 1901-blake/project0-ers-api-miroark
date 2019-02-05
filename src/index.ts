import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routers/users/users.router';
import registerAuth from './middleware/auth/register.middleware';
import loginAuth from './middleware/auth/login.middleware';
import requestLogger from './middleware/loggers/request.logger.middleware';
import reimbursementsRouter from './routers/reimbursements/reimbursements.router';
import accessControl from './middleware/auth/access.control';

const app = express();

app.use(accessControl);
app.use(bodyParser.json());
app.use(requestLogger.bind(requestLogger));
app.post('/register', registerAuth.bind(registerAuth));
app.post('/login', loginAuth.bind(loginAuth));
app.use('/users', usersRouter);
app.use('/reimbursements', reimbursementsRouter);

console.log();

app.listen(3000, () => console.log('Server started on port 3000'));
