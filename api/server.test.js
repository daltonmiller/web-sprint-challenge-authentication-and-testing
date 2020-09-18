const server = require('./server')
const supertest = require('supertest')

describe('server', function() {
    it("runs the tests", function() {
        expect(true).toBe(true)
    })
    describe("GET /", function(){
        it("should respond with 404", function() {
            return supertest(server).get('/').then(res => {
                expect(res.status).toBe(200)
            })
        })

        it('should respond with json', function() {
            return supertest(server).get('/').then(res => {
                expect(res.type).toMatch(/json/)
            })
        })
        it('should respond with api: up ', function() {
            return supertest(server).get('/').then(res => {
                expect(res.body.api).toBe('up')
            })
        })
    })
})