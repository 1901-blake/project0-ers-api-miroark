import { User } from './user';
import { UserRole, user, manager, admin } from './user.roles';

describe ('User Class', () => {

  it('can create a user with only username, password, and email.', () => {
    const testObj = {
      id: 0,
      role: user,
      username: 'miroark',
      password: 'password123',
      email: 'me@email.com',
      firstName: ' ',
      lastName: ' '
    };
    expect(new User(0, 'miroark', 'password123', 'me@email.com')).toEqual(testObj);
  });

  it('can create a user with username, password, email, first name, and last name.', () => {
    const testObj = {
      id: 0,
      role: user,
      username: 'miroark',
      password: 'password123',
      email: 'me@email.com',
      firstName: 'Mike',
      lastName: 'Roark'
    };
    expect(new User(0, 'miroark', 'password123', 'me@email.com', 'Mike', 'Roark')).toEqual(testObj);
  });

  it('can create a user with username, password, email, first name, last name, and role', () => {
    const testObj = {
      id: 0,
      role: manager,
      username: 'miroark',
      password: 'password123',
      email: 'me@email.com',
      firstName: 'Mike',
      lastName: 'Roark'
    };
    expect(new User(0, 'miroark', 'password123', 'me@email.com', 'Mike', 'Roark', manager)).toEqual(testObj);
  });
});