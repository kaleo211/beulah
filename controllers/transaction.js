var Sequelize = require('sequelize');
var models = require('../models');

var getAllTransactions = function () {
  return models.transaction.findAll().then(([projects]) => {
    return projects;
  });
};

var addTransaction = function (from, to, total, date, memo, type, category) {
  models.transaction.create({
    from: from,
    to: to,
    total: total,
    date: date,
    memo: memo,
    type: type,
    category: category
  }).then(function (transaction) {
    return transaction;
  });
}

var transaction = {
  getAllTransactions,
  addTransaction
}

module.exports = transaction
