const request = require('supertest')
const server = require('../api/server')
const db = require('../database/dbConfig')

describe('jokes tests', () => {
    it('returns json', () => {
        return request(server).get('/api/jokes/')
        .then(jokes => {
            expect(jokes.type).toEqual("application/json")
        })
    });
    it('returns a 401 if not logged in', () => {
        return request(server).get('/api/jokes/')
        .then(jokes => {
            expect(jokes.status).toEqual(401)
        })
    });


});

describe('auth register tests', () => {
    beforeEach(async () => {
        await db('users').truncate()
    })
    it('returns a json object', () => {
        return request(server).post('/api/auth/register')
        .send({'username': "lebron", password:'james'})
        .then(res => {
            expect(res.type).toEqual("application/json")
            expect(res.status).toEqual(201)
        })
        
    })


    it('returns .201', () => {
        return request(server).post('/api/auth/register')
        .send({'username': 'lebron', 'password':'james'})
        .then(res => {
            expect(res.status).toEqual(201)
        })
    })

    describe('AUTH LOGIN TESTS', () => {

        beforeEach(async () => {
            await db('users').truncate();
            // await db('users').insert({username:'testuser01','password':'testpassword01'})
          });
    
          it('returns 200', () => {
            return request(server).post('/api/auth/register')
            .send({username:'lebron',password:'james'})
            .then(resp => {
                console.log(resp.text)
                return request(server).post('/api/auth/login')
                .send({username:'lebron',password:'james'})
                .then(resp => {
                    console.log(resp.text)
                    expect(resp.status).toEqual(200)
    
                })
            })
            .catch(err => {
                console.log(err)
            })
        });

        it('returns 200', () => {
            return request(server).post('/api/auth/register')
            .send({
                username:'lebron',
                password:''})

                expect(res.body.password).toBe("jadmes")
   
        })
        it('returns ajson object', () => {
            return request(server).post('/api/auth/register')
            .send({username:'lebron', password: 'james'})
            .then(res => {
                return request(server).post('/api/auth/login')
                .send({username:'lebron', password: 'james'})
                .then(res => {
                    expect(res.type).toEqual("application/json")
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
  
})