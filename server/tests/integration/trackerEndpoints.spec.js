describe('Tracker endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB();
    })

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should retrieve all trackers', async () => {
        const res = await request(api).get('/trackers')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(24)
    })
    
    it('should retrieve a goals by userid', async() => {
        const res = await request(api).get('/trackers/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(24)
    })

    it('should retrieve a goals by userid and habitid', async() => {
        const res = await request(api).get('/trackers/1/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(8)
    })

    it('should create a new tracker', async() => {
        const res = await request(api).post('/trackers/').send({"habitId": 1,
                                                                "dailyValue": 3,
                                                                "userId": 1
                                                                })
        expect(res.statusCode).toEqual(200)
    })
});