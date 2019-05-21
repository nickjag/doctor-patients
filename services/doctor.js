const DoctorModel = require('../models/doctor');

class DoctorService {
  static async findById(userId) {
    const result = await DoctorModel.findOne({ _id: userId, active: true });
    return result || false;
  }
}

module.exports = DoctorService;
