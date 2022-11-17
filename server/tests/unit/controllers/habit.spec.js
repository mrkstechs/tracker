const habitController = require('../../../controllers/habits')
const Habit = require('../../../models/habit')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('Habits controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns all habits with a 200 status code', async () => {
            const testHabits = ['habit1', 'habit2']
            jest.spyOn(Habit, 'all', 'get')
                 .mockResolvedValue(testHabits);
            await habitController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testHabits);
        })
    })

    describe('newHabit', () => {
        test('new habit is created with a 201 status code', async () => {
            const newHabitData = {id: 1, habit: "testHabit", recommended_daily_goal: "2 tests", recommended_weekly_goal: "8 tests"}
            jest.spyOn(Habit, 'create')
            .mockResolvedValue(new Habit(newHabitData))
            const mockReq = {body: newHabitData} 
            await habitController.newHabit(mockReq, mockRes);
        })
    })
});