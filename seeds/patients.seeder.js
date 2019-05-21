import faker from 'faker';
import { Seeder } from 'mongoose-data-seed';
import User from '../models/user';
import Patient from '../models/patient';

class PatientsSeeder extends Seeder {
  async shouldRun() {
    return Patient.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    const data = await PatientsSeeder.createRecords();
    const patients = await Patient.create(data);
    await PatientsSeeder.updateWithPatients(patients);
    return patients;
  }

  static async createRecords() {
    const data = [];
    const users = await User.find({ user_type: 'patient' });
    if (users) {
      users.forEach(user => {
        data.push(PatientsSeeder.createRecord(user._id));
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

  static async updateWithPatients(patients) {
    if (patients) {
      await Promise.all(
        patients.map(async patient => {
          const user = await User.findOne({ _id: patient.user });
          if (user) {
            user.user_data = patient._id;
          }
          await user.save();
        }),
      );
    }
  }
}

export default PatientsSeeder;
