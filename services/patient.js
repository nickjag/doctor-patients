const _ = require('lodash');
const PatientModel = require('../models/patient');
const UserModel = require('../models/user');

const { distinctArr } = require('../includes/utils');

class PatientService {
  static async findByUserId(userId) {
    const patient = await PatientModel.findOne({
      user: userId,
    });
    return patient || false;
  }

  static async findAll(page = 1, query = null, size = 5) {
    const start = Math.max(0, size * (page - 1));

    if (query) {
      return this.searchAll(query, size, start);
    }

    const users = await UserModel.find({ user_type: 'patient' })
      .limit(size)
      .skip(start)
      .sort({
        _id: 'asc',
      })
      .populate('user_data');
    return users;
  }

  static async searchAll(query, size, start) {
    const end = start + size;
    const searchCols = ['first_name', 'last_name', 'email'];

    const queryParts = query
      .toLowerCase()
      .split(' ')
      .slice(0, 2);

    let resultIds = [];

    await Promise.all(
      searchCols.map(async col => {
        const addIds = await this.searchAndMapResults(col, queryParts);

        if (addIds && addIds.length) {
          resultIds = resultIds.concat(addIds);
        }
      }),
    );

    if (!resultIds.length) {
      return [];
    }

    resultIds = distinctArr(resultIds);
    resultIds.sort();

    const responseIds = resultIds.slice(start, end);
    const allUsers = await this.findByUserIds(responseIds);
    const userMap = _.mapKeys(allUsers, '_id');

    return responseIds.map(id => userMap[id]);
  }

  static async findByUserIds(userIds) {
    const allUsers = await UserModel.find({
      _id: {
        $in: userIds,
      },
    }).populate('user_data');

    return allUsers || false;
  }

  static async searchAndMapResults(col, parts) {
    const queries = parts.map(part => ({
      [col]: {
        $regex: `(${part})`,
        $options: 'i',
      },
    }));

    const results = await PatientModel.find({
      $and: [...queries],
    });

    if (!results) {
      return [];
    }

    return results.map(result => result.user);
  }
}

module.exports = PatientService;
