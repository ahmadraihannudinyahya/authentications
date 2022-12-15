const TokensRepository = require('../TokensRepository');

describe('TokensRepository Domain test', () => {
    it('should throw error when invoke class without implementation', () => {
        const tokensRepository = new TokensRepository();

        expect(() => tokensRepository.addToken()).toThrowError('Tokens_Repository_Is_Abstract_Class');
    });
});