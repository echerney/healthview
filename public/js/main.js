$(document).ready(function() {
  console.log('werkin')


//HOME PAGE
  let date = new Date()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let year = date.getFullYear()
  $('#date-spot').addClass('page-date').text(month + '/' + day + '/' + year)

  $('#login-button').click(function() {
    $('.login-user').fadeIn();
    $('#login-button').hide();
    $('.create-user').hide();
    $('#create-button').fadeIn()
  })

  $('#create-button').click(function() {
    $('.create-user').fadeIn();
    $('#create-button').hide();
    $('.login-user').hide()
    $('#login-button').fadeIn()
  })

  //form to search
  $('#search-form').submit(function(e) {
    e.preventDefault()
    let name = $('#patient-search').val()
    console.log(name)
    $.ajax({
      url: '/patient/search',
      type: 'GET',
      dataType: 'json',
      data: { name: name},
    })
    .done(function(results) {
      console.log(results);
      console.log('end of the ajax call')
      let patients = results.patients
      popSearchModal(patients);
    })
    .fail(function() {
      console.log("error");
    })
  })

  $('.search-close').click(function() {
      $('.search-modal').hide()
    })

  //search date
  $('#check-date').click(function() {
    $('#check-date').hide()
    $('#date-spot').hide()
    $('#date-search-close').fadeIn()
    $('#date-search-form').fadeIn()
  })

  $('#date-search-close').click(function() {
    $('#check-date').fadeIn()
    $('#date-spot').fadeIn()
    $('#date-search-close').hide()
    $('#date-search-form').hide()
  })

$('#date-search-form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    url: '/searchday',
    type: 'GET',
    dataType: 'json',
    data:
    {date: $('.date-input').val()},
  })
  .done(function(results) {
    console.log(results);
    let appointments = results
    popDateModal(appointments)
  })
  .fail(function(a,b) {
    console.log('a',a);
    console.log('b',b);
  })
})

  $('.date-close').click(function() {
      $('.date-modal').hide()
  })

  //check in patient
  $('.check-in-button').click(function() {
    let patientID = $(this).attr('id')
    let date = $('.page-date').text()
    $.ajax({
      url: '/patient/checkin',
      type: 'PUT',
      data:
      {
        patientID: patientID,
        date: date
      },
    })
    .done(function(results) {
      setTimeout(document.location.reload(true), 20);
    })
    .fail(function(a, b) {
      console.log('a', a);
      console.log('b', b);
    })
  });

  //add note
  $('.notes-form').submit(function(e) {
    e.preventDefault();
    let patientID = $('.notes-form').attr('id');
    let note = $('#note-box').val();
    $.ajax({
      url: 'patient/addnote',
      type: 'PUT',
      data: {
        patientID: patientID,
        note: note
      },
    })
    .done(function(results) {
      setTimeout(document.location.reload(true), 20);
    })
    .fail(function(a, b) {
      console.log('a', a);
      console.log('b', b);
    })

  })

  //pop up note modal
    $('.add-note-button').click(function() {
      let id = $(this).attr('id')
      $('.notes-modal').show()
      $('.notes-form').attr('id', id)
    })

    $('.notes-close').click(function() {
      $('.notes-modal').hide()
    })


  //PATIENT VIEW PAGE

  //scheduling modal
  $('#schedule-button').click(function() {
    $('.schedule-modal').show()
  })

  $('.schedule-close').click(function() {
    $('.schedule-modal').hide()
  })

//ajax to add appointment
  $('#schedule-form').submit(function(e) {
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
      document.location.replace('/');
    })
  })

  //DATA PAGE

  //populate dropdown



});

function popSearchModal(pArray) {
  $('.search-modal').show()
    pArray.forEach(function(patient){
      let nameLink ='<a href="/patient/' + patient._id + '"><p class="search-name">' + patient.name + '</p></a>';
      $('.search-modal-content').append(nameLink);
    })
  }

function popDateModal(dArray) {
  $('.date-modal').show()
  dArray.forEach(function(patient) {
    console.log(patient.searchedAppts)
  })
}






