import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { authRouter } from './routers/auth/auth.router';
import { adminRouter } from './routers/admin/admin.router';

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
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.send ('Working server.');
});

app.listen(8080, () => console.log('Server started on port 8080'));
