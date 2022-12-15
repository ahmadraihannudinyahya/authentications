const UsersRepository = require('../UsersRepository');

describe('UsersRepository Domain test', () => {
    it('should throw error when invoke class without implementation', () => {
        const usersRepository = new UsersRepository();

        expect(() => usersRepository.getUserByEmail()).toThrowError('Users_Repository_Is_Abstract_Class');
    });
});