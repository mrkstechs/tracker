const Tracker = require('../../../models/tracker');
const pg = require('pg');
jest.mock('pg');

const {db} = require('../../../db/init');

describe('Tracker', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('Get all trackers', () => {
        test('it resolves with all trackers on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Tracker.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('create', () => {
        test('it resolves with new tracker on successful db query', async () => {
            let trackerData = { habitId: 1, dailyValue: 2, date: "2022-11-15", userId: "1" }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ { ...trackerData, id: 1 }] });
            const result = await Tracker.create(trackerData);
            expect(result).toHaveProperty('id')
        })
    });
    

    describe('findByUserId', () => {
        test('it resolves with trackers of a user on successful db query', async () => {
            let trackerData = [{habit_id: 1, dailyValue: 2, date: "2022-11-15", userId: "1"},{habitId: 2, dailyValue: 2, date: "2022-11-15", userId: "1"},{habitId: 1, dailyValue: 2, date: "2022-11-15", userId: "2"}]
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ trackerData ] });
            const result = await Tracker.findByUserId(1);
            expect(result).toHaveLength(2)
        })
    });

    describe('findByUserAndHabit', () => {
        test('it resolves with specific trackers of a user on successful db query', async () => {
            let trackerData = [{habitId: 1, dailyValue: 2, date: "2022-11-15", userId: "1"},{habitId: 2, dailyValue: 2, date: "2022-11-15", userId: "1"},{habitId: 2, dailyValue: 2, date: "2022-11-16", userId: "1"},{habitId: 1, dailyValue: 2, date: "2022-11-15", userId: "2"}]
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ trackerData ] });
            const result = await Tracker.findByUserAndHabit(1,2);
            expect(result).toHaveLength(2)
        })
    });
})