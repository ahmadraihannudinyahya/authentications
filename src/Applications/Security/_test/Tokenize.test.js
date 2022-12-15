const Tokenize = require('../Tokenize');

describe('Tokenize Applications test', () => {
    it('should throw error when invoke class without implementation', () => {
        const tokenize = new Tokenize();

        expect(() => tokenize.createAccessToken()).toThrowError('Tokenize_Security_Is_Abstract_Class');
        expect(() => tokenize.createRefreshToken()).toThrowError('Tokenize_Security_Is_Abstract_Class');
        expect(() => tokenize.decodeRefreshToken()).toThrowError('Tokenize_Security_Is_Abstract_Class');
    });
});