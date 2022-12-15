const UsersRepositorySequelize = require('../UsersRepositorySequelize');
const { users } = require('../../../../models')

describe('UsersRepositorySequelize test', () => {
    describe('getUserByEmail method test', () => {
        it('should get user by email corectly', async () => {
            const usersRepositorySequelize = new UsersRepositorySequelize({users});

            const expectedResult = {
                id_user: 'test.user',
                email: 'test@mail.com',
                password: '$2b$12$enED54ZQ/qIToLr.AspJHebVJEOpMUXnmF3iGmqhl/QiwKeJTLaNS', //encrypt from superSecretPass
            }
            const result = await usersRepositorySequelize.getUserByEmail('test@mail.com');

            expect(result).not.toBeFalsy();
            expect(result.id_user).toEqual(expectedResult.id_user);
            expect(result.email).toEqual(expectedResult.email);
            expect(result.password).toEqual(expectedResult.password);
        });
        it('should throw error when not found data', async () => {
            const usersRepositorySequelize = new UsersRepositorySequelize({users});
            await expect(usersRepositorySequelize.getUserByEmail('unregist@mai;.com')).rejects.toThrowError();
        });
    });
});