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
    }),
    models.member.findAll()
  ]).then(([exps, trans, members]) => {
    expenses = JSON.parse(JSON.stringify(exps));
    transfers = JSON.parse(JSON.stringify(trans));
    members = members.map(function(m) {return m.get({ plain: true })});

    var debt = {};
    members.forEach(function(member) {
      debt[member.first] = 0;
    });

    expenses.forEach(function (expense) {
      debt[expense.from] += expense.total;
    });

    transfers.forEach(function (transfer) {
      debt[transfer.from] += transfer.total;
      debt[transfer.to] -= transfer.total;
    });

    var sum = 0;
    for (var key in debt) {
      sum += debt[key];
    }
    var average = sum/members.length;

    var lenders = [], lendees = [];
    for (var key in debt) {
      if (debt[key] > average) {
        lenders.push({k:key,v:debt[key]-average});
      } else if (debt[key] < average) {
        lendees.push({k:key,v:average-debt[key]});
      }
    }

    var descend = function(a, b) {
      return (a.v > b.v) ? 1 : ((b.v > a.v) ? -1 : 0);
    }
    lenders.sort(descend);
    lendees.sort(descend);

    var owns = [];
    while (lenders.length>0) {
      if (lendees.length==0) {
        console.log('error: the debt is not even.');
        break;
      }

      var from = lendees[0].k, to = lenders[0].k, total;
      if (lenders[0].v > lendees[0].v) {
        total = lendees[0].v;
        lenders[0].v -= lendees[0].v;
        lendees.splice(0,1);
        lenders.sort(descend);
      } else {
        total = lenders[0].v;
        lendees[0].v -= lenders[0].v;
        lenders.splice(0,1);
        lendees.sort(descend);
      }
      owns.push({from: from, to: to, total: total});
    }

    return owns;
  });
};

module.exports = summary;
