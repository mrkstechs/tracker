describe('User endpoints', () => {
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

    it('should retrieve all users', async () => {
        const res = await request(api).get('/users')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].username).toEqual('test1')
        expect(res.body[1].username).toEqual('test2')
    });

})