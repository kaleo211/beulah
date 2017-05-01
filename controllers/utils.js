var utils = {}

utils.capitalize = function(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

module.exports = utils;