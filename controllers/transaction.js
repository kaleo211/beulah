var Sequelize = require('sequelize');
var models = require('../models');

var getAllTransactions = function () {
  return models.transaction.findAll().then((transactions) => {
    return transactions.map(function (transaction) {
      return transaction.get({ plain: true })
    });
  });
};

var addTransaction = function (from, to, total, date, memo, type, category) {
  return models.transaction.create({
    from: from,
    to: to,
    total: total,
    date: date,
    type: type,
    category: category,
    memo: memo
  }).then(function (transaction) {
    return transaction.get({ plain: true });
  });
}

var transaction = {
  getAllTransactions,
  addTransaction
}

module.exports = transaction
