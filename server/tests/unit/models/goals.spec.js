const Goal = require('../../../models/Goal');
const pg = require('pg');
jest.mock('pg');

const {db} = require('../../../db/init');

describe('Goal model', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('Get all goals', () => {
        test('it resolves with all goals on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Goal.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('create', () => {
        test('it resolves with new goal on successful db query', async () => {
            let goalData = { userId: 1, habitId: 1, dailyGoal: 8, weeklyGoal: 56, goalUnits: "hours" }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ { ...goalData, id: 1 }] });
            const result = await Goal.create(goalData);
            expect(result).toHaveProperty('id')
        })
    });
    

    describe('findByUserId', () => {
        test('it resolves with goals of a user on successful db query', async () => {
            let goalData = { userId: 1, habitId: 1, dailyGoal: 8, weeklyGoal: 56, goalUnits: "hours" }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ goalData ] });
            const result = await Goal.findByUserId(1);
            expect(result[0]).toBeInstanceOf(Goal)
        })
    });

    describe('findByUserAndHabit', () => {
        test('it resolves with specific goals of a user on successful db query', async () => {
            let goalData = { userId: 1, habitId: 1, dailyGoal: 8, weeklyGoal: 56, goalUnits: "hours" }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ goalData ] });
            const result = await Goal.findByUserAndHabit(1,2);
            expect(result[0]).toBeInstanceOf(Goal)
        })
    });
})