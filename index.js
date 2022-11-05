let map;
let markers = []

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -13.002730, lng: -38.527716 },
    zoom: 12,
  });

  var request = {
    location: new google.maps.LatLng(-13.009440, -38.492860),
    radius: '4000',
    type: 'restaurant',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        // if(results[i].vicinity.toLowerCase().indexOf('rio vermelho') >= 0)
        createPoint(results[i]);
        markers.push(results[i].geometry.location);
      }
      map.setCenter(results[0].geometry.location);
    }
  });

  new MarkerClusterer({ markers, map });
}

function createPoint(item) {
  let marker = new google.maps.Marker({
    position: item.geometry.location,
    title: item.name,
    map: map,
  });
}

window.initMap = initMap;

