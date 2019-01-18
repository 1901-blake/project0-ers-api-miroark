export class UserRole {
  id: number; // Primary key
  role: string; // not null; unique

  constructor (id:number, role:string){
    this.id = id;
    this.role = role;
  }
};

export const user = new UserRole(0, "user");
export const manager = new UserRole(1, "Financial MAnager");
export const admin = new UserRole(2, "Administrator");
