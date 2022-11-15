const Habit = require('../../../models/habit');
const pg = require('pg');
jest.mock('pg');

const {db} = require('../../../db/init');

describe('Habit model', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('Get all habits', () => {
        test('it resolves with all habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Habit.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('create', () => {
        test('it resolves with new habit on successful db query', async () => {
            let habitData = {habit: "testHabit", recommended_daily_goal: "2 tests", recommended_weekly_goal: "8 tests"}
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ { ...habitData, id: 1 }] });
            const result = await Habit.create(habitData);
            expect(result).toHaveProperty('id')
        })
    });
});