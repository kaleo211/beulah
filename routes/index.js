var router = require('express').Router();
var models = require('../models');
var controllers = require('../controllers');

router.use(function (req, res, next) {
  next();
});

router.get('/', function (req, res) {
  controllers.transaction.getAllTransactions().then(function (transactions) {
    res.status(200).render('index', {transactions: transactions});
  });
});

router.post('/addTransaction', function (req, res) {
  var body = req.body;
  controllers.transaction.addTransaction(
    body.from,
    body.to,
    body.total,
    body.date,
    body.memo,
    body.type,
    body.category
  ).then(function (transaction) {
    res.status(200).json(transaction);
  });
});

module.exports = router;
