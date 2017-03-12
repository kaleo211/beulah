var Sequelize = require('sequelize');
var models = require('../models');

var query = `SELECT E.from, E.to, SUM(total) AS total 
                 FROM (SELECT * FROM transactions T WHERE T.type=?) E 
                 GROUP BY E.from, E.to;`;

var summary = {};

summary.get = function () {
  return Promise.all([
    models.sequelize.query(query, {
      replacements: ["expense"],
      type: Sequelize.QueryTypes.SELECT
    }),
    models.sequelize.query(query, {
      replacements: ["transfer"],
      type: Sequelize.QueryTypes.SELECT
    })
  ]).then(([exps, trans]) => {
    expenses = JSON.parse(JSON.stringify(exps));
    transfers = JSON.parse(JSON.stringify(trans));

    var debt = {};
    expenses.forEach(function (expense) {
      debt[expense.from] = expense.total;
    });

    transfers.forEach(function (transfer) {
      if (!debt[transfer.from]) debt[transfer.from] = 0;
      debt[transfer.from] = debt[transfer.from] + transfer.total;

      if (!debt[transfer.to]) debt[transfer.to] = 0;
      debt[transfer.to] = debt[transfer.to] - transfer.total;
    });

    var sum = 0, length=0;
    for (var key in debt) {
      if (debt[key]) {
        sum += debt[key];
        length++;
      }
    }
    var average = sum/length;
    var owns = [];
    for (var key in debt) {
      owns.push({from: key, total: average - debt[key]});
    };
    return owns;
  });
};

module.exports = summary;
