const _ = require("lodash");

module.exports = function(errors) {
  const result = {};
  _.forEach(errors, (val, key) => {
    result.global = val.message;
  });
  return result;
}
