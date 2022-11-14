const User = require('../../../models/user');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../db/init');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('findByUsername', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { id: 1, username: 'testusername' }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ ownerData] });
            const result = await User.findByUsername("testusername");
            expect(result).toBeInstanceOf(User)
        })
    });
    
})