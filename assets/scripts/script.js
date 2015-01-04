/* Hide all of the content before the page loads */
$(".content").hide().fadeIn(2000);

/* Social toggle */
$(document).ready(function(){
  $('#social-click').click(function(){
    $('.social-icon').toggle( "slide" );
  });
});




