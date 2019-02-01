import User  from './user';
import { user, manager } from './user.roles';

describe ('User Class', () => {
  it('has a working constructor', () => {

    expect(new User(0, 'miroark', 'password123', 'me@email.com')).toBeDefined();
  });

  it('can create and object without being give parameters/', () => {
    const testObj = {
      id : 0,
      username : '',
      password: '',
      email: '',
      firstName : '',
      lastName : '',
      role : 1
    };
    expect(new User).toEqual(testObj);
  });

  it('can create a user with only username, password, and email.', () => {
    const testObj = {
      id: 0,
      role: user.id,
      username: 'miroark',
      password: 'password123',
      email: 'me@email.com',
      firstName: '',
      lastName: ''
    };
    expect(new User(0, 'miroark', 'password123', 'me@email.com')).toEqual(testObj);
  });

  it('can create a user with username, password, email, first name, and last name.', () => {
    const testObj = {
      id: 1,
      role: user.id,
      username: 'miroark',
      password: 'password123',
      email: 'me@email.com',
      firstName: 'Mike',
      lastName: 'Roark'
    };
    expect(new User(1, 'miroark', 'password123', 'me@email.com', 'Mike', 'Roark')).toEqual(testObj);
  });

  it('can create a user with username, password, email, first name, last name, and role', () => {
    const testObj = {
      id: 2,
      role: manager.id,
      username: 'miroark',
      password: 'password123',
      email: 'me@email.com',
      firstName: 'Mike',
      lastName: 'Roark'
    };
    expect(new User(2, 'miroark', 'password123', 'me@email.com', 'Mike', 'Roark', manager.id)).toEqual(testObj);
  });
});
