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
  resp = controllers.transaction.addTransaction(
    body.from,
    body.to,
    body.total,
    body.date,
    body.memo,
    body.type,
    body.category
  ).then(function (resp) {
    res.status(200);
  });
});

module.exports = router;
