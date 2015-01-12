$(document).ready(function() {

  $('#see-matches').click(function(){
    $('#matches').append('<tr><td>Match ID</td><td>Match Name</td><td>Started At</td></tr>');
    $.get('/matches', function(matches) {
      $.each(matches, function(index, value) {
        var matchId = value.event.id;
        var matchName = value.event.name;
        $('#matches').append("<tr><td id="+matchId+">"+matchId+"<a>save</a></td><td>"+matchName+"</td><td>"+value.event.openDate+"</td></tr>");
         makeClickable(matchId, matchName); 
      });
    });
  });

  $('#see-db').click(function() {
    window.location.href = "/history";
  });

  $('#submit').click(function() {
    var eventId = $('select').val().split(':')[0];
    var matchName = $('select').val().split(':')[1];
    $('h2').text(matchName);
    $('#odds').empty();
    $('#odds').append('<tr><td>Recorded at</td><td>Winn</td><td>Loose</td><td>Draw</td></tr>');
    $.get('/getData/'+eventId, function(data) {
      data.forEach(function(entry) {
        $('#odds').append("<tr><td>"+entry.createdAt+"</td><td>"+entry.team1Win+"</td><td>"+entry.team1Loose+"</td><td>"+entry.draw+"</td></tr>");
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
          $('#win').text("Win "+odds.team1Win);
          $('#loose').text("Loose "+odds.team1Loose);
          $('#draw').text("Draw "+odds.draw);
        })
      });
    });  
  }
})