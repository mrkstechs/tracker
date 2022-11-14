const usersController = require('../../../controllers/users')
const User = require('../../../models/user')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('Users controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns all users with a 200 status code', async () => {
            let testUsers = ['user1', 'uesr2']
            jest.spyOn(User, 'all', 'get')
                 .mockResolvedValue(testUsers);
            await usersController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testUsers);
        })
    });

    describe('login', () => {
        test('', async () => {
            let testUser = {username: "testusername", password: "testpass"}
            jest.spyOn(User, 'findByUsername')
                .mockResolvedValue(User.findByUsername(testUser))
            const mockReq = {body: testUser}
            await usersController.login(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({success: true , token: ""})
        })
    })

    describe('register', () => {
        test('new user created with a 201 status code', async () => {
            let newUser = {id: 1, username: "testusername", firstName: "Test", lastName: "Tester", password: "testpass"}
            jest.spyOn(User, 'create')
                .mockResolvedValue(new User(newUser))
            const mockReq = {body: newUser}
            await usersController.register(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith({msg: 'User created'})
        })
    })

    describe('createToken', () => {

    })
})