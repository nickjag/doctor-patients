import faker from 'faker';
import { Seeder } from 'mongoose-data-seed';
import User from '../models/user';
import Doctor from '../models/doctor';

class DoctorsSeeder extends Seeder {
  async shouldRun() {
    return Doctor.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    const data = await DoctorsSeeder.createRecords();
    const doctors = await Doctor.create(data);
    await DoctorsSeeder.updateWithDoctors(doctors);
    return doctors;
  }

  static async createRecords() {
    const data = [];
    const users = await User.find({ user_type: 'doctor' });
    if (users) {
      users.forEach(user => {
        data.push(DoctorsSeeder.createRecord(user._id));
      });
    }
    return data;
  }

  static createRecord(userId) {
    return {
      address: faker.address.streetAddress(),
      age: Math.floor(Math.random() * 30) + 18,
      city: faker.address.city(),
      email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone_number: faker.phone.phoneNumber(),
      state: faker.address.state(),
      user: userId,
    };
  }

  static async updateWithDoctors(doctors) {
    if (doctors) {
      await Promise.all(
        doctors.map(async doctor => {
          const user = await User.findOne({ _id: doctor.user });
          if (user) {
            user.user_data = doctor._id;
          }
          await user.save();
        }),
      );
    }
  }
}

export default DoctorsSeeder;
