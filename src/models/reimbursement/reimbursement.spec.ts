import { Reimbursement } from './reimbursement';

describe('Reimburment', () => {
    it('Can create a new object with all parameters', () => {
        const testObj = {
            reimbursementId : 1,
            author : 2,
            amount : 3,
            dateSubmitted : 4,
            dateResolved : 5,
            description : 'a test object',
            resolver : 6,
            status : 7,
            type : 8
        };
        expect(new Reimbursement(1, 2, 3, 4, 5, 'a test object', 6, 7, 8)).toEqual(testObj);
    });
});