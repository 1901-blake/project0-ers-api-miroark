import express from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './routers/auth/auth.router';
import { adminRouter } from './routers/admin/admin.router';
import { financeManagerRouter } from './routers/finanace-manager/finance.manager';
import { usersRouter } from './routers/users/users.router';

const app = express();

// const sess = {
//   secret: 'This is a very important secret. Tell no one.',
//   cookie: {secure: false},
//   resave: false,
//   saveUninitialized: false
// };

// app.use(session(sess));
app.use(bodyParser.json());
app.use((req, res, next) => {// Logger
  console.log(`${req.method} Request recieved from ${req.ips} for ${req.path}`);
  next();
});

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/finance-manager', financeManagerRouter);
app.use('/admin', adminRouter);

app.listen(8080, () => console.log('Server started on port 8080'));
