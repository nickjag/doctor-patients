import mongooseLib from 'mongoose';

import Users from './seeds/users.seeder';
import Patients from './seeds/patients.seeder';
import Doctors from './seeds/doctors.seeder';

mongooseLib.Promise = global.Promise;

// Export the mongoose lib
export const mongoose = mongooseLib;

// Export the mongodb url
export const mongoURL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/nickjag_doctor_patient';

/*
  Seeders List
  ------
  order is important
*/
export const seedersList = {
  Users,
  Patients,
  Doctors,
};
