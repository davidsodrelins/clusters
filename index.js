let map;
let markers = [];
let places = [];

const types = ['bar','meal_delivery','restaurant' ];
const numtypes = types.length;
const request = {
  radius: '800',
  fields: ['name', 'geometry']
};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -13.002730, lng: -38.527716 },
    zoom: 12,
  });

  request.location = new google.maps.LatLng(-13.010652, -38.486895),

  buscar();
}

async function searchPlaces(results, status, pagination) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    let _places = [];
    for (var i = 0; i < results.length; i++) {
      places.push({
        location: results[i].geometry.location,
        name: results[i].name
      })
    }
    map.setCenter(results[0].geometry.location);
    if (pagination.hasNextPage) {
      pagination.nextPage();
    }
    new markerClusterer.MarkerClusterer({ markers, map });
  }
}

function createPoint(item) {
  let marker = new google.maps.Marker({
    position: item.location,
    title: item.name,
    map: map,
    icon: "img/icon/pinblack.png",
  });
  markers.push(marker);
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