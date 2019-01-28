export class ReimbursementType {
    typeId: number; // Primary key
    type: string; // Not null; unique

    constructor (id: number, type: string) {
        this.typeId = id;
        this.type = type;
    }
}

export const lodging = new ReimbursementType(1, 'Lodging');
export const travel = new ReimbursementType(2, 'Travel');
export const food = new ReimbursementType(3, 'Food');
export const other = new ReimbursementType(4, 'Other');