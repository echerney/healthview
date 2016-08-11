$(document).ready(function() {
  console.log('werkin')


//HOME PAGE
  let date = new Date()
  let month = date.getMonth()
  let day = date.getDate()
  let year = date.getFullYear()
  $('h2').addClass('page-date').text('<   ' + month + '/' + day + '/' + year + '   >')

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

  //form to search
  $('#searchForm').submit(function(e){
    e.preventDefault()
    let name = $('#patientSearch').val()
    console.log(name)
    $.ajax({
      url: '/patient/search',
      type: 'GET',
      dataType: 'json',
      data: { name: name},
    })
    .done(function(results) {
      console.log(results);
    })
    .fail(function() {
      console.log("error");
    })
  })


  //PATIENT VIEW PAGE

  //scheduling modal
  $('#schedule-button').click(function(){
    console.log('clicked')
    $('.schedule-modal').show()
  })

  $('.schedule-close').click(function(){
    $('.schedule-modal').hide()
  })

//ajax to add appointment
  $('#schedule-form').submit(function(e){
    e.preventDefault()
    let param = location.pathname.split('/')[2]
    console.log(param)
    let date = $('#schedule-date').val()
    console.log(date)
    $.ajax({
      url: '/patient/' + param,
      type: 'PUT',
      data: {
        date: date
      },
    })
    .fail(function(err) {
      console.log(err);
    })
    .done(function() {
      document.location.reload(true);
    })
  })

});

