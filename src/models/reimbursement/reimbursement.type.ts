export class ReimbursementType {
    typeId: number; // Primary key
    type: string; // Not null; unique

    constructor (id: number, type: string) {
        this.typeId = id;
        this.type = type;
    }
}

export const lodging = new ReimbursementType(0, 'Lodging');
export const travel = new ReimbursementType(1, 'travel');
export const food = new ReimbursementType(2, 'Food');
export const other = new ReimbursementType(3, 'Other');