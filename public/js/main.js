var map;

function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  return currentMap;
}

$(function createMap(){
  map = initializeMap();
    // jQUERY for hotel select
  for (var i in hotels) {
    $("#hotels").append($("<option>").attr("value", "0").text(hotels[i].name));
  }

  // jQUERY for restaurant select
  for (var j in restaurants) {
    $("#restaurants").append($("<option>").attr("value", "0").text(restaurants[j].name));
  }

  // jQUERY for activity select
  for (var k in activities) {
    $("#activities").append($("<option>").attr("value", "0").text(activities[k].name));
  }
})


// adding a day
var count = 1;
if ($("#day-add").click(function() {
  count++;
  $(".day-btn").append(`<div><button class="btn btn-circle day-btn"> ${ count } </button></div>`);
}));

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(map);
  }

  // jQUERY for hotel add button
  $("#hotel-btn").click(function() {
    var selectedHotel = $("#hotels option:selected").text();
    var hotelCoords = [];
    for (var i in hotels) {
      if (selectedHotel === hotels[i].name) {
        hotelCoords = hotels[i].place.location;
      }
    }
    selectedHotel.className = "itinerary-item";
    $("#hotel-i").append(`<div class="itinerary-item {{selectedHotel}}"> ${ selectedHotel } </div> <button class="btn btn-xs btn-danger remove btn-circle pull-right {{selectedHotel}}">x</button> <br>`);
    drawMarker('hotel', hotelCoords);
  });

  // jQUERY for restaurant add button
  $("#restaurant-btn").click(function() {
    var selectedrestaurant = $("#restaurants option:selected").text();
    var restaurantCoords = [];
    for (var i in restaurants) {
      if (selectedrestaurant === restaurants[i].name) {
        restaurantCoords = restaurants[i].place.location;
      }
    }
    selectedrestaurant.className = "itinerary-item";
    $("#restaurant-i").append(`<div class="itinerary-item"> ${ selectedrestaurant } </div><button class="btn btn-xs btn-danger remove btn-circle pull-right" id="btn-restaurant-i">x</button><br>`);
    drawMarker('restaurant', restaurantCoords);
  });

  // jQuery for activity add button
  $("#activity-btn").click(function() {
    var selectedactivity = $("#activities option:selected").text();
    for (var i in activities) {
      if (selectedactivity === activities[i].name) {
        activityCoords = activities[i].place.location;
      }
    }
    selectedactivity.className = "itinerary-item";
    $("#activity-i").append(`<div class="itinerary-item"> ${ selectedactivity } </div><button class="btn btn-xs btn-danger remove btn-circle pull-right" id="btn-activity-i">x</button><br>`);
    drawMarker('activity', activityCoords);
  });

  // jQuery for deleting hotel item
  $("#hotel-i").on('click', '#hotel-i.children("button")', function() {
    console.log("hotel inventory button clicked");
  });

