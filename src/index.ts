import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from './models/user/user';
import { users, config } from './config';
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

app.post('/register', (req, res) => {// Currently only makes admins.
  const hashedPass = bcrypt.hashSync(req.body.password, 8);
  const newUser = new User(1, req.body.username, hashedPass, req.body.email,
    req.body.firstName, req.body.lastName);

    // insert into the 'Database';
    users.push(newUser);

  const token = jwt.sign({...newUser}, config.secret, {
    expiresIn: 86400
  });

  res.status(200).send({auth: true, token: token, user: newUser});
});

app.post('/login', (req, res) => {
  const user = users[req.body.id];

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    res.status(401).send({auth: false, token: undefined, message: 'Invalid Credentials'});
  } else {

    const token = jwt.sign({...user}, config.secret, {
      expiresIn: 86400
    });

    res.status(200).send({auth: true, token: token, user: user});
  }
});

app.use('/users', usersRouter);
// app.use('/auth', authRouter);
// app.use('/finance-manager', financeManagerRouter);
// app.use('/admin', adminRouter);

app.listen(8080, () => console.log('Server started on port 8080'));
