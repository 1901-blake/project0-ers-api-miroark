import { UserRoles } from './user.roles';

export class User {
  id: number;
  role: string;

  username: string;
  password: string;
  email: string;

  firstName: string;
  lastName: string;

  constructor(username: string, password: string, email: string, firstName: string = ' ', lastName: string = ' ', role: string = UserRoles.user) {
    this.id = 0; // Need logic to generate unique key.
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
