$(document).ready(function(){


// THE CHANGING OF MY NAV-BAR COLOR /////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
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
    

// BUDGET SLIDER YOOOOOOOOOOOOOOOO /////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
    $("#budget").slider();
    $("#budget").on("slide", function(slideEvt) {
      $("#sliderVal").text(slideEvt.value);
      if (slideEvt.value >= 5000) {
        $("#sliderVal").text("5000+");
      }
    });

  

// MODALS ON MODALS ON MODALS ON MODALS /////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////

  // MY Forget Password Modal
  $(".reset-link").on("click", function() {
    $('#logModal').modal('hide');
  });
  
  //Autofocus for the Modals
  $('.modal').on('shown.bs.modal', function() {
    $(this).find('[autofocus]').focus();
  });

  


// LETS GET THIS PARTY STARTED YOO /////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
  $('#directions-panel').hide();
  $('.secondary').hide();


//THIS STARTS IT ALL!!!!!

  $(".travelSearch").on('submit', function(e){
    e.preventDefault();

    //Reset EVERYTHING
    $('#directions-panel').show();
    $('#directions-panel').empty();
    $('#secondary').empty();

    //Call the Map direction and display map function
    calcRoute();
    displayMap();

    //console.log
    console.log($('#origin').val());
    console.log($('#destination').val());
    console.log($('#dateStart').val());
    console.log($('#dateEnd').val());
    console.log($('#budget').slider('getValue'));

    //Clear all input values
    $('#origin').val("");
    $('#destination').val("");
    $('#dateStart').val("");
    $('#dateEnd').val("");


    //scroll to the map portion
    $("body").animate({scrollTop: $("#map-canvas").offset().top }, 2000);

    
    //SHOW NEXT STEPS (EVENTS, HOTELS, FOOD)
    $('.secondary').show();

  });





//THE MOST AWESOME GOOGLE MAPS YAY /////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    function displayMap() {
      document.getElementById('map-canvas').style.display="block";
      initialize();
    }

    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer();
      var styles = [{
        stylers: [
          { hue: "#00ffe6" },
          { saturation: -20 }
        ]
      },{
        featureType: "road",
        elementType: "geometry",
        stylers: [
          { lightness: 100 },
          { visibility: "simplified" }
        ]
      },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
      }
    ];
    var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

      var mapOptions = {
        zoom: 7,
        scrollwheel: false,
        center: new google.maps.LatLng(41.850033, -87.6500523),
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');
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




