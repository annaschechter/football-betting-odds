$(document).ready(function() {

  $('a').click(function(){
    $('table').append('<tr><td>Match ID</td><td>Match Name</td><td>Started At</td></tr>');
  });
})