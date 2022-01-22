import { App } from '../src/app'
import { boot } from '../src/main'
import request from 'supertest'

let application: App

let jwtToken = ''

beforeAll(async () => {
	const { app } = await boot
	application = app
})

describe('Users e2e', () => {
	it('Register - error', async () => {
		const res = await request(application.app)
			.post('/users/register')
			.send({ email: 'a@a.com', name: 'Ben', password: '1234' })

		expect(res.statusCode).toBe(422)
	})

	// it('Register - success', async () => {
	// 	const res = await request(application.app)
	// 		.post('/users/register')
	// 		.send({ email: 'b@a.com', name: 'Pit', password: '12' })

	// 	expect(res.statusCode).toBe(200)
	// })

	it('Login - error with invalid email', async () => {
		const res = await request(application.app).post('/users/login').send({ email: 'oiuer@oiu.com', password: '12' })

		expect(res.statusCode).toBe(401)
	})

	it('Login - error with invalid password', async () => {
		const res = await request(application.app).post('/users/login').send({ email: 'b@a.com', password: '1' })

		expect(res.statusCode).toBe(401)
	})

	it('Login - success', async () => {
		const res = await request(application.app).post('/users/login').send({ email: 'b@a.com', password: '12' })

		jwtToken = res.body.jwt
		expect(res.statusCode).toBe(200)
		expect(jwtToken).not.toBeUndefined()
	})

	it('Info - success', async () => {
		const login = await request(application.app).post('/users/login').send({ email: 'b@a.com', password: '12' })
		const res = await request(application.app).get('/users/info').set('Authorization', `Bearer ${login.body.jwt}`)

		expect(res.statusCode).toBe(200)
		expect(res.body.email).toBe('b@a.com')
	})

	it('Info - error', async () => {
		const res = await request(application.app).get('/users/info').set('Authorization', `Bearer 1`)

		expect(res.statusCode).toBe(401)
	})
})

afterAll(() => {
	application.close()
})
