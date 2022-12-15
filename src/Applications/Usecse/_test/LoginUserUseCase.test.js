const LoginUserUseCase = require('../LoginUserUseCase');
const Encryptions = require('../../Security/Encryptions');
const Tokenize = require('../../Security/Tokenize');
const Validations = require('../../Security/Validations');
const UsersRepository = require('../../../Domains/Users/UsersRepository');

describe('LoginUserUsecase test', () => {
    it('should orchestrating LoginUserUsecase corectly', async () => {
        const payload = {
            email: 'test@mail.com',
            password: 'testpassword',
        };
        
        const expectedUser = {
            id_user: 'usertest', 
            email: 'test@mail.com',
            password: 'encrypted',
        };

        const expectedAccessToken = 'Access.Token';
        const expectedRerfeshToken = 'Refresh.Token';

        const mockEncryptions = new Encryptions();
        const mockTokenize = new Tokenize();
        const mockValidations = new Validations();
        const mockUsersRepository = new UsersRepository();

        mockValidations.validateLoginPayload = jest.fn(() => {
            return Promise.resolve();
        });
        mockUsersRepository.getUserByEmail = jest.fn(() => {
            return Promise.resolve(expectedUser);
        });
        mockEncryptions.compare = jest.fn(() => {
            return Promise.resolve();
        });
        mockTokenize.createAccessToken = jest.fn(() => {
            return Promise.resolve(expectedAccessToken);
        });
        mockTokenize.createRefreshToken = jest.fn(() => {
            return Promise.resolve(expectedRerfeshToken);
        });

        const loginUserUseCase = new LoginUserUseCase({
            encryptions: mockEncryptions, 
            tokenize: mockTokenize, 
            validations: mockValidations, 
            usersRepository: mockUsersRepository, 
        });

        const result = await loginUserUseCase.execute(payload);

        expect(mockValidations.validateLoginPayload).toBeCalledWith(payload);
        expect(mockUsersRepository.getUserByEmail).toBeCalledWith(payload.email);
        expect(mockEncryptions.compare).toBeCalledWith(payload.password, expectedUser.password);
        expect(mockTokenize.createAccessToken).toBeCalledWith(expectedUser.id_user);
        expect(mockTokenize.createRefreshToken).toBeCalledWith(expectedUser.id_user);
        expect(result).toEqual({
            access_token: expectedAccessToken, 
            refresh_token: expectedRerfeshToken, 
        });
    });
});
