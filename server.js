var express = require('express');
var app = express();
var router = require('./routes');

app.use('/', router);
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.listen(3000, function () {
  console.log('Beulah is listening on port 3000!');
});
