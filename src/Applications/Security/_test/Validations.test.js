const Validations = require('../Validations');

describe('Validations Applications test', () => {
    it('should throw error when invoke class without implementation', () => {
        const validations = new Validations();

        expect(() => validations.validateLoginPayload()).toThrowError('Validations_Security_Is_Abstract_Class');
    });
});