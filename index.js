let map;
let markers = [];
let places = [];
const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

const types = ['bar', 'meal_delivery', 'restaurant'];
const numtypes = types.length;
const request = {
  radius: '800',
  fields: ['name', 'geometry']
};

function gerarCsv(){

  if(places.length === 0){
    alert('Nenhum dado para exportar... Tente novamente em alguns segundos.')
  } else {
   var csv = 'Id, X, Y, Empresa, Atividade Google, Nota, Qualquer Lugar, Acessibilidade, Publico 1, Publico 2, Preco, Site, Padrao, Redes Sociais\n';

   places.forEach((item) => {
           csv += item.Id;
           csv += ','+ item.X;
           csv += ','+ item.Y;
           csv += ','+ item.empresa;
           csv += ','+ item.atividadeGoogle;
           csv += ','+ item.nota;
           csv += ','+ item.qualquerLugar;
           csv += ','+ item.acessibilidade;
           csv += ','+ item.publico1;
           csv += ','+ item.publico2;
           csv += ','+ item.preco;
           csv += ','+ item.site;
           csv += ','+ item.padrao;
           csv += ','+ item.redes_sociais;
           csv += '\n';
   });
 
   const data = new Date().toLocaleString();   
   var hiddenElement = document.createElement('a');
   hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
   hiddenElement.target = '_blank';
   hiddenElement.download = 'places-'+data+'.csv';
   hiddenElement.click();
  }
}

function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -13.002730, lng: -38.527716 },
    styles: myStyles,
    zoom: 12,
  });

  request.location = new google.maps.LatLng(-13.010652, -38.486895)

  buscar();
  move();
}

function searchPlaces(results, status, pagination) {
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
  new markerClusterer.MarkerClusterer({ markers, map });
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
    } else if (width <= 20) {
      width = 30
      elem.style.width = width + '%';
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}
