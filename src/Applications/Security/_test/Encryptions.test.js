const Encryptions = require('../Encryptions');

describe('Encryptions Applications test', () => {
    it('should throw error when invoke class without implementation', () => {
        const encryptions = new Encryptions();

        expect(() => encryptions.compare()).toThrowError('Encryptions_Security_Is_Abstract_Class');
    });
});