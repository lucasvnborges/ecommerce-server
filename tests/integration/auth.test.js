const request = require('supertest')
const faker = require('faker')
const httpStatus = require('http-status')
const app = require('../../src/app')
const setupTestDB = require('../utils/setupTestDB')
const { User } = require('../../src/models')
const { userOne, insertUsers } = require('../fixtures/user.fixture')

setupTestDB()

describe('Auth routes', () => {
  describe('POST /v1/auth/register', () => {
    let newUser
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'password1'
      }
    })

    test('deve retornar 201 e registrar o usuário com sucesso se os dados solicitados estiverem certos', async () => {
      const res = await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.CREATED)

      expect(res.body.user).not.toHaveProperty('password')
      expect(res.body.user).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        role: 'user',
        isEmailVerified: false
      })

      const dbUser = await User.findById(res.body.user.id)
      expect(dbUser).toBeDefined()
      expect(dbUser.password).not.toBe(newUser.password)
      expect(dbUser).toMatchObject({ name: newUser.name, email: newUser.email, role: 'user', isEmailVerified: false })

      expect(res.body.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() }
      })
    })
  })
})
