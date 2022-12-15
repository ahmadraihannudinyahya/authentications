const { createContainer } = require('instances-container');

// 3rd party module
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// database model
const { users } = require('../../models');

// implemented infras
const UsersRepositorySequelize = require('./Repository/UsersRepositorySequelize');
const EncryptionsBcrypt = require('./Security/EncryptionsBcrypt');
const TokenizeJwt = require('./Security/TokenizeJwt');
const ValiadtionsJoi = require('./Security/ValiadtionsJoi');

// usecase
const GetAccessTokenUsecse = require('../Applications/Usecse/GetAccessTokenUsecse');
const LoginUserUseCase = require('../Applications/Usecse/LoginUserUseCase');


const container = createContainer();

container.register([
    {
        key: 'UsersRepository',
        Class: UsersRepositorySequelize,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'users', 
                    concrete: users 
                },
            ],
        },
    },
    {
        key: 'Encryptions',
        Class: EncryptionsBcrypt,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'bcrypt', 
                    concrete: bcrypt 
                },
            ],
        },
    },
    {
        key: 'Tokenize',
        Class: TokenizeJwt,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'jwt', 
                    concrete: jwt 
                },
            ],
        },
    },
    {
        key: 'Valiadtions',
        Class: ValiadtionsJoi,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'joi', 
                    concrete: Joi 
                },
            ],
        },
    },
]);

// register usecase 
container.register([
    {
        key: 'GetAccessTokenUsecase',
        Class: GetAccessTokenUsecse,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'tokenize', 
                    internal: 'Tokenize' 
                },
            ],
        },
    },
    {
        key: 'LoginUserUseCase',
        Class: LoginUserUseCase,
        parameter: {
            injectType: 'destructuring',
            dependencies: [
                { 
                    name: 'encryptions', 
                    internal: 'Encryptions' 
                },
                { 
                    name: 'tokenize', 
                    internal: 'Tokenize' 
                },
                { 
                    name: 'validations', 
                    internal: 'Valiadtions' 
                },
                { 
                    name: 'usersRepository', 
                    internal: 'UsersRepository' 
                },
            ],
        },
    },
]);

module.exports = container;