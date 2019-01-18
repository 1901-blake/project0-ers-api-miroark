import { UserRoles } from './user.roles';

export class User {
  role:string;

  username:string;
  password:string;
  email:string;

  firstName:string;
  lastName:string;

  constructor(username:string, password:string, email:string, firstName:string = ' ', lastName:string = ' ', role:string = UserRoles.user) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
