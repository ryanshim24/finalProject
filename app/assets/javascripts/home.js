$(document).ready(function(){

  // MY Forget Password Modal
  $(".reset-link").on("click", function() {
    $('#logModal').modal('hide');
  });
  
  //Autofocus for the Modals
  $('.modal').on('shown.bs.modal', function() {
    $(this).find('[autofocus]').focus();
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

    // $(".travelSearch").on('submit', function(e){
    //   e.preventDefault();
    //   var origin = $('#origin').val();
    //   var budget = $('#budget').data('slider').getValue();
    //   var startDate = $('#dateStart').val();
    //   var endDate = $('#dateEnd').val();

    //   console.log(origin);
    //   console.log(budget);
    //   console.log(startDate);
    //   console.log(endDate);
    // });


// QbXNQXcrtZdN5ktL.






    // function getDirections(origin,end){
    //   // return $.getJSON("https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+end+"&key=AIzaSyB4YVLXv__XgNZ6HhzTsaUvaJQObIsMteE");
    //   $.ajax({
    //     type: 'GET',
    //     url: "https://maps.googleapis.com/maps/api/directions/json?origin="+origin+"&destination="+end+"&key=AIzaSyB4YVLXv__XgNZ6HhzTsaUvaJQObIsMteE",
    //     dataType: 'jsonp',
    //     success: function(result) {
    //       console.log("results returned!");
    //       dis = result;
    //       result.routes.forEach(function(data){
    //         $('.travelData').append(data.legs.duration.text);
    //       });
    //     }
    //   });
    // }

    // $(".travelSearch").on('submit', function(e){
    //   e.preventDefault();
    //   var origin = $('#origin').val();
    //   var end = $('#end').val(); 
    //   getDirections(origin, end);

    //   // $.when(getDirections(origin,end)).done(function(result){
    //   //   console.log(result);
    //   //   result.routes.forEach(function(data){
    //   //     $('.travelData').append(data.legs.duration.text);
    //   //   });
    //   // });
    // });


// AIzaSyB4YVLXv__XgNZ6HhzTsaUvaJQObIsMteE


});//DOCUMENT CLOSED




