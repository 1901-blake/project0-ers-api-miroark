import userRoles from 'user.roles';

export class User {
  let role:string;

  let username:string;
  let password:string;
  let email:string;

  let firstName:string;
  let lastName:string;

  constructor(username:string, password:string, email:string) {
    this.username = username;
    this.password = password;
    this.email = email;

    this.role = userRoles.user;
  }

  constructor(username:string, password:string, email:string, firstName:string, lastName:string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;

    this.role = userRoles.user;
  }

  constructor(username:string, password:string, email:string, firstName:string, lastName:string, role:string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
