import { ReimbursementType } from './reimbursement.type';

describe('ReimbursementType', () => {
    it('can create new types', () => {
        const testObj = {
            typeId: 45,
            type: 'fun'
        };
        expect(new ReimbursementType(45, 'fun')).toEqual(testObj);
    });
});