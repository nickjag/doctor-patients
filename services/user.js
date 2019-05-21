const UserModel = require('../models/user');
require('../models/patient');
require('../models/doctor');

class UserService {
  static async authenticateUserByUsername(username, incomingPassword) {
    const user = await UserModel.findOne({ username }).populate('user_data');
    if (!user) {
      return false;
    }

    const passwordsMatch = await user.comparePassword(incomingPassword);

    if (!passwordsMatch) {
      return false;
    }
    return user;
  }

  static async findByUsername(username) {
    const result = await UserModel.findOne({ username });
    return result || false;
  }

  static async findById(userId) {
    const result = await UserModel.findOne({ _id: userId }).populate(
      'user_data',
    );
    return result || false;
  }

  static async isUsernameAvailable(username) {
    const result = await UserModel.findOne({ username });
    return !result;
  }
}

module.exports = UserService;
