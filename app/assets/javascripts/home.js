$(document).ready(function(){

  $('#directions-panel').hide();
  $('.secondary').hide();
  

  // MY Forget Password Modal
  $(".reset-link").on("click", function() {
    $('#logModal').modal('hide');
  });
  
  //Autofocus for the Modals
  $('.modal').on('shown.bs.modal', function() {
    $(this).find('[autofocus]').focus();
  });

  


  $(".travelSearch").on('submit', function(e){
    e.preventDefault();
    displayMap();
    calcRoute();
    $('#directions-panel').show();
    $('.secondary').show();
    $("body").animate({scrollTop: $("#map-canvas").offset().top }, 2000);
    $('#origin').val("");
    $('#destination').val("");
    $('#dateStart').val("");
    $('#dateEnd').val("");
  });


  // THE CHANGING OF MY NAV-BAR COLOR 
  var scroll_start = 0;
    var startchange = $('#startchange');
    var offset = startchange.offset();

    if (startchange.length){
      $(document).scroll(function() { 
        scroll_start = $(this).scrollTop();
        if(scroll_start > offset.top) {
          $(".navbar-default").css('background', 'rgba(255,255,255,0.85)');
          $('.navbar-default').css('border-bottom-color', 'rgba(0, 0, 0, 0.0980392)');
        } else {
          $('.navbar-default').css('background-color', 'transparent');
          $('.navbar-default').css('border-bottom-color', 'rgba(0, 0, 0, 0)');
          $(".navbar-default").css('background', 'none ');
        }
      });
    }//end of start changed
    

    // BUDGET SLIDER
    $("#budget").slider();
    $("#budget").on("slide", function(slideEvt) {
      $("#sliderVal").text(slideEvt.value);
      if (slideEvt.value >= 5000) {
        $("#sliderVal").text("5000+");
      }
    });



// this is MAP 

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    function displayMap() {
      document.getElementById('map-canvas').style.display="block";
      initialize();
    }

    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(41.850033, -87.6500523)
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('directions-panel'));

  // var control = document.getElementById('control');
  // control.style.display = 'block';
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
    } 

    function calcRoute() {
      var start = document.getElementById('origin').value;
      var end = document.getElementById('destination').value;
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
     });
    }

  google.maps.event.addDomListener(window, 'load', initialize);






});//DOCUMENT CLOSED




