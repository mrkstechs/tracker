const User = require('../../../models/user');
const pg = require('pg');
jest.mock('pg');

const {db} = require('../../../db/init');

describe('User model', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('Get all users', () => {
        test('it resolves with all users on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await User.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('create', () => {
        test('it resolves with new user on successful db query', async () => {
            let userData = { username: 'newUser', firstName: "New", lastName: "User", email: "newuser@test.com", password:"testpass" }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ { ...userData, id: 1 }] });
            const result = await User.create(userData);
            expect(result).toHaveProperty('id')
        })
    });
    

    describe('findByUsername', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, username: 'testusername' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ userData ] });
            const result = await User.findByUsername("testusername");
            expect(result).toBeInstanceOf(User)
        })
    });
    
})