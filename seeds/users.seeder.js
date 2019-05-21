import faker from 'faker';
import { Seeder } from 'mongoose-data-seed';
import User from '../models/user';

const sanitizeString = (str, pattern) => str.replace(pattern, '');
const matchUsername = /[^a-zA-Z0-9]/gi;

const rounds = 25;
const sharedPassword = '12345';
const userType = ['doctor', 'patient'];
const data = [];

for (let i = 0; i < rounds; i += 1) {
  const record = {
    password: sharedPassword,
    username: sanitizeString(faker.internet.userName(), matchUsername),
    user_type: userType[Math.round(Math.random())],
  };

  data.push(record);
}

class UsersSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;
