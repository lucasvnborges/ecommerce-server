const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const faker = require('faker')
const User = require('../../src/models/user.model')

const password = 'p@ssw0rd1'
const salt = bcrypt.genSaltSync(8)
const hashedPassword = bcrypt.hashSync(password, salt)

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  role: 'user',
  isEmailVerified: false
}

const insertUsers = async users => {
  await User.insertMany(users.map(user => ({ ...user, password: hashedPassword })))
}

module.exports = {
  userOne,
  insertUsers
}
