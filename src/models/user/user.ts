import { user } from './user.roles';

export default class User {
  id: number;
  role: number;

  username: string;
  password: string;
  email: string;

  firstName: string;
  lastName: string;

  constructor
  (id: number = 0, username: string = '', password: string = '', email: string = '', firstName: string = '', lastName: string = '', role: number = user.id) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
