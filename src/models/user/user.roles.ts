export class UserRole {
  id: number; // Primary key
  role: string; // not null; unique

  constructor (id: number, role: string) {
    this.id = id;
    this.role = role;
  }
}

export const user = new UserRole(1, 'user');
export const manager = new UserRole(2, 'Financial Manager');
export const admin = new UserRole(3, 'Administrator');
