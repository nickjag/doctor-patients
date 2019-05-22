import faker from 'faker';
import { Seeder } from 'mongoose-data-seed';
import User from '../models/user';

const sanitizeString = (str, pattern) => str.replace(pattern, '');
const matchUsername = /[^a-zA-Z0-9]/gi;

const rounds = 25;
const sharedPassword = '12345';
const userType = ['doctor', 'patient'];
const data = [];

const logs = { doctor: null, patient: null };

for (let i = 0; i < rounds; i += 1) {
  const randUserType = userType[Math.round(Math.random())];
  const randUsername = sanitizeString(faker.internet.userName(), matchUsername);

  const record = {
    password: sharedPassword,
    username: randUsername,
    user_type: randUserType,
  };

  if (!logs[randUserType]) {
    logs[randUserType] = {
      username: randUsername,
      password: sharedPassword,
    };
  }

  data.push(record);
}

console.log('Sample Data');
console.log(JSON.stringify(logs, null, 2));

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
