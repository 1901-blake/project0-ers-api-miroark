import { UserRole, user, manager, admin } from './user.roles';
import jwt from 'jsonwebtoken';

export default class User {
  id: number;
  userrole: number;

  username: string;
  userpassword: string;
  email: string;

  firstname: string;
  lastname: string;

  constructor(id: number = 0, username: string = '', password: string = '', email: string = '', firstName: string = '', lastName: string = '', role: number = user.id) {
    this.id = id; // Need logic to generate unique key.
    this.username = username;
    this.userpassword = password;
    this.email = email;
    this.firstname = firstName;
    this.lastname = lastName;
    this.userrole = role;
  }
}
