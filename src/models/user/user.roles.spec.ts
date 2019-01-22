import { UserRole } from './user.roles';

describe ('User roles', () => {
    it('can create a new role', () => {
        const testRole = {
            id: 5,
            role: 'tester'
        };
        expect(new UserRole(5, 'tester')).toEqual(testRole);
    });
});