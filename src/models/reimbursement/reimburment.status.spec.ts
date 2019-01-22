import { ReimbursementStatus } from './reimbursement.status';

describe ('Reimbursement Status', () => {
    it('Can make new status status', () => {
        const testType = {
            statusId : 23,
            role: 'exploded'
        };
        expect(new ReimbursementStatus(23, 'exploded')).toEqual(testType);
    });
});