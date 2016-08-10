$(document).ready(function() {
  console.log('werkin')


//HOME PAGE
  let date = new Date()
  let month = date.getMonth()
  let day = date.getDate()
  let year = date.getFullYear()
  $('h2').text('<   ' + month + '/' + day + '/' + year + '   >')

  $('#login-button').click(function(){
    $('.login-user').toggle();
    $('#login-button').toggle();
    $('.create-user').hide();
    $('#create-button').show()
  })

  $('#create-button').click(function(){
    $('.create-user').toggle();
    $('#create-button').toggle();
    $('.login-user').hide()
    $('#login-button').show()
  })
});

