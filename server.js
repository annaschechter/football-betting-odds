var app = require('express')();
var server = require('http').Server(app);

app.get('/', function(req, res) {
  res.send("Football Betting Odds");
});

server.listen(3000, function() {
  console.log("Listening on port 3000");
})