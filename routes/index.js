var router = require('express').Router();
var models = require('../models');
var controllers = require('../controllers');

router.use(function (req, res, next) {
  next();
});

router.get('/', function(req, res) {
  controllers.transaction.getAllTransactions().then(function (resp) {
    res.status(200).render('index', resp);
  });
});

module.exports = router;
