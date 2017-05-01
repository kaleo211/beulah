var Sequelize = require('sequelize');
var models = require('../models');
var utils = require('./utils');

var getAllTransactions = function () {
  return models.transaction
      .findAll({order: [['date', 'DESC']]})
      .then((transactions) => {
        return transactions.map(function (transaction) {
          t = transaction.get({ plain: true })
          t.from = utils.capitalize(t.from);
          t.to = utils.capitalize(t.to);
          t.type = utils.capitalize(t.type);
          t.category = utils.capitalize(t.category);
          return t
        });
      });
};

var addTransaction = function (from, to, total, date, memo, type, category) {
  return models.transaction.create({
    from: from.toLowerCase(),
    to: type.toLowerCase()=="transfer" ? to.toLowerCase() : "",
    total: total,
    date: new Date(date),
    type: type.toLowerCase(),
    category: type.toLowerCase()=="expense" ? category.toLowerCase() : "",
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
