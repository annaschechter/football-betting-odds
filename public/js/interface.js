$(document).ready(function() {

  $('a').click(function(){
    $('table').append('<tr><td>Match ID</td><td>Match Name</td><td>Started At</td></tr>');
    $.get('/matches', function(matches) {
      $.each(matches, function(index, value) {
        var matchId = value.event.id;
        var matchName = value.event.name;
        $('table').append("<tr><td id="+matchId+">"+matchId+"<a>save</a></td><td>"+matchName+"</td><td>"+value.event.openDate+"</td></tr>");;
         makeClickable(matchId, matchName); 
      });
    });
  });

  var makeClickable = function(matchId, matchName) {
    $("#"+matchId).click(function(){
      console.log(matchId);
      $.get('/getMarketId/'+matchId+'/'+matchName, function(data) {
        $('p').text(data.marketId);
        $.get('/getOdds/'+data.marketId+'/'+data.matchId, function(odds) {
          console.log(odds);
          $('h2').append("Win "+odds.team1Win);
          $('h2').append("Loose "+odds.team1Loose);
          $('h2').append("Draw "+odds.draw);
        })
      });
    });  
  }
})