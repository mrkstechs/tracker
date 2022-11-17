describe('Goal endpoints', () => {
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

    it('should retrieve all goals', async () => {
        const res = await request(api).get('/goals')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(3)
    })

    it('should retrieve a goals by userid', async() => {
        const res = await request(api).get('/goals/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(3)
    })

    it('should retrieve a goals by userid', async() => {
        const res = await request(api).get('/goals/1/1')
        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toEqual(1)
    })
});
