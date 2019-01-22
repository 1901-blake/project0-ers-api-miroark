export class ReimbursementStatus {
    statusId: number; // Primary Key
    role: string; // Not null; unique

    constructor (id: number, role: string) {
        this.statusId = id;
        this.role = role;
    }
}

export const pending = new ReimbursementStatus(0, 'Pending');
export const approved = new ReimbursementStatus(1, 'Approved');
export const denied = new ReimbursementStatus(2, 'Denied');