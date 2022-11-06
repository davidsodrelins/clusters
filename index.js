let map;
let markers = []
let places = []
const types = ['bakery', 'bar', 'cafe', 'food', 'meal_delivery', 'meal_takeaway', 'restaurant', 'supermarket']
const numtypes = types.length
const request = {
  radius: '800',
  fields: ['name', 'geometry']
};

function initMap() {
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -13.002730, lng: -38.527716 },
    zoom: 12,
  });

  request.location = new google.maps.LatLng(-13.010652, -38.486895)

  buscar()
  move()
}

function searchPlaces(results, status, pagination) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    let _places = []
    for (var i = 0; i < results.length; i++) {
      places.push({
        location: results[i].geometry.location,
        name: results[i].name
      })
    }
    map.setCenter(results[0].geometry.location);
    if (pagination.hasNextPage) {
      pagination.nextPage()
    }
    new markerClusterer.MarkerClusterer({ markers, map });
  }
}

function createPoint(item) {
  let marker = new google.maps.Marker({
    position: item.location,
    title: item.name,
    map: map,
    // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    // icon: "https://www.iconpacks.net/icons/1/free-pin-icon-48-thumb.png",
  });
  markers.push(marker)
}

function buscar() {
  var service = new google.maps.places.PlacesService(map);
  for (let i = 0; i < numtypes; i++) {
    request.type = types[i];
    service.textSearch(request, searchPlaces);
  }
}
setTimeout(() => {
  places.forEach(e => {
    createPoint(e)
  });
}, 10 * 1000);

window.initMap = initMap;


function move() {
  var elem = document.getElementById("myBar");   
  var width = 1;
  var id = setInterval(frame, 130);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      document.getElementById('loadbar').remove()
      document.getElementById('map').style.opacity = 1
    } else if(width <= 20){
      width = 30
      elem.style.width = width + '%';
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }
}