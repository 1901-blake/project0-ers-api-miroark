import { User } from './models/user/user';
import bcrypt from 'bcryptjs';
import { Reimbursement } from './models/reimbursement/reimbursement';
import { admin } from './models/user/user.roles';


export const config = {
    'secret' : 'PassToken'
};

export const credentials = {
  username: 'mike',
  password: 'password123'
}

// temporary array for holding Users as they register while developing.
// currently, every users id is equal to their position in the queue.
// instantiate an admin.
export const users = [new User(0, 'admin', bcrypt.hashSync('pass', 8), 'admin@here.com', 'admin', 'admin', admin)];
// Temp array of fake tickets.
export const tickets = [
  new Reimbursement(0, 0, 5, new Date().getTime(), new Date().getTime() + 1000, 'I was hungry', 0, 0, 0),
  new Reimbursement(1, 0, 5, new Date().getTime(), new Date().getTime() + 1000, 'I was hungry', 0, 0, 0),
  new Reimbursement(2, 0, 5, new Date().getTime(), new Date().getTime() + 1000, 'I was hungry', 0, 0, 0)
];