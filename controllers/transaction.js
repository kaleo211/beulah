var Sequelize = require('sequelize');
var models = require('../models');
var utils = require('./utils');

var get = function (option) {
  return models.transaction
      .findAll({
        order: [['date', 'DESC']]
        // where: {
        //   type: option['type'],
        //   category: option['category'],
        //   date: option['date']
        // }
      })
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

var add = function (from, to, total, date, memo, type, category) {
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
  get,
  add
}

module.exports = transaction
