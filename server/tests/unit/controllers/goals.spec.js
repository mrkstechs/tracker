const goalController = require('../../../controllers/goals')
const Goal = require('../../../models/goal')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('Goals controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns all goals with a 200 status code', async () => {
            const testGoals = ['goal1', 'goal2']
            jest.spyOn(Goal, 'all', 'get')
                 .mockResolvedValue(testGoals);
            await goalController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testGoals);
        })
    });

    describe('newGoal', () => {
        test('new goal is created with a 201 status code', async () => {
            const newGoalData = { userId: 1, habitId: 1, dailyGoal: 8, weeklyGoal: 56, goalUnits: "hours" }
            jest.spyOn(Goal, 'create')
            .mockResolvedValue(new Goal(newGoalData))
            const mockReq = {body: newGoalData} 
            await goalController.newGoal(mockReq, mockRes);
        })
    });

    describe('findByUserId', () => {
        test('Returns goals belonging to specific user id', async () => {
            const testGoal = { userId: 1, habitId: 1, dailyGoal: 8, weeklyGoal: 56, goalUnits: "hours" }
            jest.spyOn(Goal, 'findByUserId')
                .mockResolvedValue(new Goal(testGoal))
            const mockReq = {params: {userid: 1}}
            await goalController.findByUserId(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200)
        })
    })

    describe('findByUserAndHabit', () => {
        test('Returns goals belonging to specific user id and habit id', async () => {
            const testGoal = { userId: 1, habitId: 1, dailyGoal: 8, weeklyGoal: 56, goalUnits: "hours" }
            jest.spyOn(Goal, 'findByUserAndHabit')
                .mockResolvedValue(new Goal(testGoal))
            const mockReq = {params: {userid: 1, habitid: 1}}
            await goalController.findByUserId(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200)
        })
    })
})