var Sequelize = require('sequelize');
var models = require('../models');
var utils = require('./utils');

var search = function (option) {
  var query = {};
  if (option.order) {
    query['order'] = [[option.order.field, option.order.order]];
  }
  if (option.focus) {
    var eq = {};
    eq[option.focus.field] = option.focus.value;
    query['where'] = eq;
  }

  return models.transaction
    .findAll(query)
    .then((transactions) => {
      return transactions.map((t) => { return t.get({ plain: true }) })
    });
};

var add = function (from, to, total, date, memo, type, category) {
  return models.transaction.create({
    from: from.toLowerCase(),
    to: type.toLowerCase() == "transfer" ? to.toLowerCase() : "",
    total: total,
    date: new Date(date),
    type: type.toLowerCase(),
    category: type.toLowerCase() == "expense" ? category.toLowerCase() : "",
    memo: memo
  }).then(function (transaction) {
    return transaction.get({ plain: true });
  });
};

var transaction = {
  search,
  add
};

module.exports = transaction;
