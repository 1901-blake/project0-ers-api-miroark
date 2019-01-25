import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routers/users/users.router';
import registerAuth from './middleware/auth/register.middleware';
import loginAuth from './middleware/auth/login.middleware';
import requestLogger from './middleware/loggers/request.logger.middleware';

const app = express();

app.use(bodyParser.json());
app.use(requestLogger.bind(requestLogger));
app.post('/register', registerAuth.bind(registerAuth));
app.post('/login', loginAuth.bind(loginAuth));
app.use('/users', usersRouter);

app.listen(8080, () => console.log('Server started on port 8080'));
