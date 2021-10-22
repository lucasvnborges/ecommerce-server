const httpStatus = require('http-status');
const { User } = require('../models');
const ErrorApi = require('../utils/ErrorApi');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ErrorApi(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

module.exports = {
  createUser,
};
