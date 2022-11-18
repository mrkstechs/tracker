const trackerController = require('../../../controllers/trackers')
const Tracker = require('../../../models/tracker')

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('Trackers controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns all trackers with a 200 status code', async () => {
            const testTrackers = ['tracker1', 'tracker2']
            jest.spyOn(Tracker, 'all', 'get')
                 .mockResolvedValue(testTrackers);
            await trackerController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testTrackers);
        })
    });

    describe('newTracker', () => {
        test('new tracker is created with a 201 status code', async () => {
            const newTrackerData = { habitId: 1, dailyValue: 3, date: "2022-11-15", userId: 1 }
            jest.spyOn(Tracker, 'create')
            .mockResolvedValue(new Tracker(newTrackerData))
            const mockReq = {body: newTrackerData} 
            await trackerController.newTracker(mockReq, mockRes);
        })
    })

    describe('findByUserId', () => {
        test('Returns trackers belonging to specific user id', async () => {
            const testTracker = { habitId: 1, dailyValue: 3, date: "2022-11-15", userId: 1 }
            jest.spyOn(Tracker, 'findByUserId')
                .mockResolvedValue(new Tracker(testTracker))
            const mockReq = {params: {userid: 1}}
            await trackerController.findByUserId(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200)
        })
    })

    describe('findByUserAndHabit', () => {
        test('Returns trackers belonging to specific user id and habit id', async () => {
            const testTracker = { habitId: 1, dailyValue: 3, date: "2022-11-15", userId: 1 }
            jest.spyOn(Tracker, 'findByUserAndHabit')
                .mockResolvedValue(new Tracker(testTracker))
            const mockReq = {params: {userid: 1, habitid: 1}}
            await trackerController.findByUserId(mockReq, mockRes)
            expect(mockStatus).toHaveBeenCalledWith(200)
        })
    })
})