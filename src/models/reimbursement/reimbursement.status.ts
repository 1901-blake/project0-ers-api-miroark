export class ReimbursementStatus {
    statusId: number; // Primary Key
    role: string; // Not null; unique

    constructor (id: number, role: string) {
        this.statusId = id;
        this.role = role;
    }
}

export const pending = new ReimbursementStatus(1, 'Pending');
export const approved = new ReimbursementStatus(2, 'Approved');
export const denied = new ReimbursementStatus(3, 'Denied');