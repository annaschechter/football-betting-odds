$(document).ready(function() {

  $('a').click(function(){
    $('table').append('<tr><td>Match ID</td><td>Match Name</td><td>Started At</td></tr>');
    $.get('/matches', function(data) {
      $.each(data, function(index, value) {
        var id = value.event.id;
        $('table').append("<tr><td id="+id+">"+id+"</td><td>"+value.event.name+"</td><td>"+value.event.openDate+"</td></tr>");;
          $("#"+id).click(function(){
            console.log(id);
            $.get('/getMarketId/'+id, function(data) {
              $('p').text(data);
              $.get('/getOdds/'+data, function(data1) {
                console.log(data1);
                $.each(data1, function(key1, value1) {
                  console.log(value);
                  $('h2').append(key1+":"+value1);
                }); 
              })
            });
          });  
      });
    });
  });
})