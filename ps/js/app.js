//Initialize Foundation 
$(document).foundation();

//Scroll to Anchor Tags
$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
    || location.hostname == this.hostname) {

    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

    if (target.length) {
      $('html,body').animate({ scrollTop: target.offset().top + -10}, 1000);
      return false;
    }
  }
});

//Form
var name, email, phone, radioVal, educationLevel, programChoice, startDate; 

function getValues (){
  name = $('#name-field', '#submit-form').val();
  email = $('#email-field', '#submit-form').val();
  phone = $('#phone-field', '#submit-form').val();
  radioVal = $('input[name=radio]:checked', '#submit-form').val()
  educationLevel = $('#education-field option:selected').val();
  programChoice = $('#program-field option:selected').val();
  startDate = $('#start-field option:selected').val();
}


$('#submit-form').on('valid', function(e){
  e.preventDefault();
  getResponse();
});

function resetForm(){
  $('#submit-form')[0].reset();
}

//Form Ajax Request
function getResponse(){

  getValues();

  $.ajax({
    type:"POST",
    url: "https://mandrillapp.com/api/1.0/messages/send.json" ,
    data:{
      'key':'X06ENjpgtIkr-uA23gO6NA',
      'message':{
        'from_email': 'benjamin.mark.adam@gmail.com',
        'to': [
            {
              'email': 'benjamin.mark.adam@gmail.com',
              'name': 'Ben',
              'type': 'to'
            }
          ],
        'autotext': 'true',
        'subject': 'New Student Request',
        'html': '<p>Student Name: '+ name +
                  '<br>' + 'Email: ' + email + 
                  '<br>' + 'Phone: ' + phone + 
                  '<br>' + 'Undergraduate Degree: ' + radioVal +
                  '<br>' + 'Program Choice: ' + programChoice +
                  '<br>' + 'Start Preference: ' + startDate +
                '</p>'
      }
    },
    beforeSend: function (){

      $('#submit-button')
        .addClass('sending')
        .html('<i class="fa fa-circle-o-notch fa-spin"></i> Sending');
    },
    error: function (data) {
      
      $('#submit-button')
        .removeClass('sending')
        .addClass('error')
        .html('<i class="fa fa-times"></i> Try again.');

      $('.response-container').html('Looks like something went wrong. Click the reset button and try again.');

      $('#submit-button').on('click', function(e){
        e.preventDefault();
        resetForm();
        $('#submit-button').removeClass('error');
      });

    },
    success: function (data){
      //Send GA Converstion
      ga('send', 'event', 'lead', 'lp', 'v1');
      
      //Update Button
      $('#submit-button')
        .removeClass('sending')
        .addClass('sent')
        .html('<i class="fa fa-check"></i> Sent')
        .prop("disabled", true);
      //Add Success Message
      $('.response-container').html('Thank you! We will contact you shortly with some more information about our programs.');
      
    }

  });
}
