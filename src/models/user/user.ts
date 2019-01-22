import { UserRole, user, manager, admin } from './user.roles';

export class User {
  id: number;
  role: UserRole;

  username: string;
  password: string;
  email: string;

  firstName: string;
  lastName: string;

  constructor(id: number, username: string, password: string, email: string, firstName: string = ' ', lastName: string = ' ', role: UserRole = user) {
    this.id = id; // Need logic to generate unique key.
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
