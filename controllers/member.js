var Sequelize = require('sequelize');
var models = require('../models');

var member = {};

member.get = function () {
  return models.member.findAll().then(function(members) {
    return members.map(function(m) {
      return m.get({plain: true});
    });
  });
};

module.exports = member;
