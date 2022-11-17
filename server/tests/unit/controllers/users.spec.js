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
            const testUser = {id:1, email:"test@gmail.com", username: "testusername", firstname: "Test", lastname: "Tester", password: "$2b$12$5Jj91KP/f9wm0kNxsNL4nOPdsPRlKNF4xm0M3lOnCLT.wNgs/UUTG"}
            const login = {"username": "testusername", "password": "abc123"}
            jest.spyOn(User, 'findByUsername')
                .mockResolvedValue(new User(testUser))
            console.log(new User(testUser))
            const mockReq = {body: login}
            await usersController.login(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200)
        })
    });

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
            const generatedToken = await usersController.createToken(testUserData)
            expect(generatedToken.length).toEqual(183)
        })
    })
})