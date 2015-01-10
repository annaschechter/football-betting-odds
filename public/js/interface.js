$(document).ready(function() {

  $('a').click(function(){
    $('table').append('<tr><td>Match ID</td><td>Match Name</td><td>Started At</td></tr>');
    $.get('/matches', function(data) {
      $.each(data, function(index, value) {
        $('table').append("<tr><td id="+value.event.id+">"+value.event.id+"</td><td>"+value.event.name+"</td><td>"+value.event.openDate+"</td></tr>");    
      });
    });
  });
})