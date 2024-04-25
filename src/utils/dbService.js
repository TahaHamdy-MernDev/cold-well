const dbService = {
  create: (model, data) => {
    return model
      .create(data)
      .then((result) => result)
      .catch((err) => {
        throw err;
      });
  },

  updateOne: (model, filter, data, options = { new: true }) => {
    return model.findOneAndUpdate(filter, data, options).exec();
  },

  deleteOne: (model, filter, options = { new: true }) => {
    return model.findOneAndDelete(filter, options).exec();
  },

  updateMany: (model, filter, data) => {
    return model
      .updateMany(filter, data)
      .then((result) => result.modifiedCount)
      .catch((error) => {
        throw error;
      });
  },

  deleteMany: (model, filter) => {
    return model
      .deleteMany(filter)
      .then((result) => result.deletedCount)
      .catch((error) => {
        throw error;
      });
  },

  findOne: (model, filter, options = {}) => {
    return model.findOne(filter, options).exec();
  },

  findMany: (model, filter, options = {}) => {
    return model.find(filter, options).exec();
  },

  count: (model, filter) => {
    return model.countDocuments(filter).exec();
  },

  paginate: (model, filter, options) => {
    return model.paginate(filter, options).exec();
  },
};

module.exports = dbService;
