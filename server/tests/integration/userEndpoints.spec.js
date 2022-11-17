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

    it('should allow login with correct details', async () => {
        const res = await request(api).post('/users/login').send({"username": "test1", "password": "abc123"})
        expect(res.statusCode).toEqual(200)
    });

    it('should allow registeration', async () => {
        const res = await request(api).post('/users/register').send({"email": "test@gmail.com",
                                                                    "firstName": "Test",
                                                                    "lastName": "Tester",
                                                                    "username": "testuser",
                                                                    "password": "$2b$12$4Ah04EzYN3ilHi4b7ptGCuL2DC/bucfo9fV9ZvFPldCV7SAGaJhOm"
                                                                     })
        expect(res.statusCode).toEqual(201)
    });

})