var app = require('express')();
var server = require('http').Server(app);

app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
app.use(require('express').static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

server.listen(3000, function() {
  console.log("Listening on port 3000");
})