var Sequelize = require('sequelize');
var models = require('../models');

var getAllTransactions = function () {
  return models.transaction.findAll().then(([projects]) => {
    return projects;
  });
};

var addTransaction = function (from, to, total, date, memo) {
  models.transaction.create({from:from,to:to,total:total,date:date,memo:memo});
}

var transaction = {
  getAllTransactions,
  addTransaction
}

module.exports = transaction
