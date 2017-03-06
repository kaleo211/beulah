var Sequelize = require('sequelize');
var fs = require('fs')
var path = require('path')

var sequelize = new Sequelize(
  process.env.BEULAH_MYSQL_DATABASE,
  process.env.BEULAH_MYSQL_USER,
  process.env.BEULAH_MYSQL_PASSWORD, {
  host: process.env.BEULAH_MYSQL_HOST,
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

var db = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.')!=0 && file != 'index.js';
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    console.log
    db[model.name] = model;
  });

Object.keys(db).forEach(function(model) {
  if ("associate" in db[model]) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
