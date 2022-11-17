describe('Habit endpoints', () => {
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

    it('should retrieve all habits', async () => {
        const res = await request(api).get('/habits')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(3)
    })

    it('should create a new habit', async() => {
        const res = await request(api).post('/habits/').send({habit: "Test",
                                                            recommended_daily_goal: 3,
                                                            recommended_weekly_goal: 9
                                                            })
        expect(res.statusCode).toEqual(200)
    })
});
