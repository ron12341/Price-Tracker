module.exports = function cleanJSON(schema) {
  schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  });
};
