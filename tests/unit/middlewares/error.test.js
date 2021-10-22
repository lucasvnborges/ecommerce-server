const httpStatus = require('http-status')
const httpMocks = require('node-mocks-http')
const testDB = require('../../utils/setupTestDB')
const ErrorApi = require('../../../src/utils/ErrorApi')
const { errorConverter } = require('../../../src/middlewares/error')

describe('Error middlewares', () => {
  describe('Error converter', () => {
    testDB('should return the same ErrorApi object', () => {
      const error = new ErrorApi(httpStatus.BAD_REQUEST, 'Any error')
      const next = jest.fn()

      errorConverter(error, httpMocks.createRequest(), httpMocks.createResponse(), next)

      expect(next).toHaveBeenCalledWith(error)
    })
  })
})
