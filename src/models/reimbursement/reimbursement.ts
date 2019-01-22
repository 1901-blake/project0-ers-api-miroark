export class Reimbursement {
    reimbursementId: number; // primary key
    author: number;  // foreign key -> User, not null
    amount: number;  // not null
    dateSubmitted: number; // not null
    dateResolved: number; // not null
    description: string; // not null
    resolver: number; // foreign key -> User
    status: number; // foreign ey -> ReimbursementStatus, not null
    type: number; // foreign key -> ReimbursementType

    constructor (
        id: number, userId: number, amount: number,
        dateSubmitted: number, dateResolved: number, description: string,
        resolverId: number, status: number, type: number) {
            this.reimbursementId = id;
            this.author = userId;
            this.amount = amount;
            this.dateSubmitted = dateSubmitted;
            this.dateResolved = dateResolved;
            this.description = description;
            this.resolver = resolverId;
            this.status = status;
            this.type = type;
    }
}