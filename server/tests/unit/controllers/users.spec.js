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
            const testUsers = ['user1', 'uesr2']
            jest.spyOn(User, 'all', 'get')
                 .mockResolvedValue(testUsers);
            await usersController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testUsers);
        })
    });

    describe('login', () => {
        test('allows login with 200 status code', async () => {
            const testUser = {username: "testusername", password: "testpass"}
            jest.spyOn(User, 'findByUsername')
                .mockResolvedValue(User.findByUsername(testUser))
            const mockReq = {body: testUser}
            await usersController.login(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200)
            expect(mockJson).toHaveBeenCalledWith({success: true , token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZXRzdCIsImZpcnN0TmFtZSI6ImFkc2YiLCJpYXQiOjE2Njg0Mzg0NjUsImV4cCI6MTY2ODQ0MjA2NX0.srKjIH_mWogqk2AcOGzXRuwAlYSIodE8Uccp7PPXw20"})
        })
    })

    describe('register', () => {
        test('new user created with a 201 status code', async () => {
            const newUser = {username: "testusername", firstName: "Test", lastName: "Tester", password: "testpass"}
            jest.spyOn(User, 'create')
                .mockResolvedValue(new User(newUser))
            const mockReq = {body: newUser}
            await usersController.register(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(201)
            expect(mockJson).toHaveBeenCalledWith({msg: 'User created'})
        })
    })

    describe('createToken', () => {
        test('token is created', async () => {
            const testUserData = {username: "testusername", firstName:"Test"}
            const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZXRzdCIsImZpcnN0TmFtZSI6ImFkc2YiLCJpYXQiOjE2Njg0Mzg0NjUsImV4cCI6MTY2ODQ0MjA2NX0.srKjIH_mWogqk2AcOGzXRuwAlYSIodE8Uccp7PPXw20"
            const generatedToken = await usersController.createToken(testUserData)
            expect(generatedToken).toEqual(testToken)
        })
    })
})