// JavaScript Document
reset();
var dest = 0;
var strId = 'destination-input';
document.getElementById('btn-ini').addEventListener('click', btnAdd, false);

function btnAdd() {
    if (dest <= 4) {
        dest++;
        document.getElementById(strId + dest).style.display = 'block';
        document.getElementById('btnDelInput').style.opacity = '1';
    }
    if (dest == 5) document.getElementById('btn-ini').style.opacity = '0.4';
}

function btnDel() {
    if (dest > 0) {
        document.getElementById(strId + dest).value = '';
        document.getElementById(strId + dest).style.display = 'none';
        document.getElementById('btn-ini').style.opacity = '1';
        dest--;
    }
    if (dest == 0) document.getElementById('btnDelInput').style.opacity = '0.5';
}

document.getElementById('inlineFormSelect').addEventListener('change', formSelect, false);

function formSelect() {
    if (!(document.getElementById("inlineFormSelect").value === "Выбрать..." || document.getElementById("inlineFormSelect").value === "Choose..." || document.getElementById("inlineFormSelect").value === "Выбраць...")) {
        document.getElementById('add-input').style.display = 'block';
    } else document.getElementById('add-input').style.display = 'none';
}

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var uluru = {
        lat: 53.8835622,
        lng: 27.4395527
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru,
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
        },
        panControl: false,
        draggable: true,

        /* ------------------ style map */
        styles: [{
                elementType: 'geometry',
                stylers: [{
                    color: '#242f3e'
                }]
            },
            {
                elementType: 'labels.text.stroke',
                stylers: [{
                    color: '#242f3e'
                }]
            },
            {
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#746855'
                }]
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#d59563'
                }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#d59563'
                }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{
                    color: '#263c3f'
                }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#6b9a76'
                }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{
                    color: '#38414e'
                }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#212a37'
                }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#9ca5b3'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{
                    color: '#746855'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#1f2835'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#f3d19c'
                }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{
                    color: '#2f3948'
                }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#d59563'
                }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    color: '#17263c'
                }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#515c6d'
                }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{
                    color: '#17263c'
                }]
            }
        ],
        /* --------------------style map */


    });


    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(53.8835622, 27.4395527));


    var searchBoxOrig = new google.maps.places.Autocomplete(document.getElementById('origin-input'), {
        bounds: defaultBounds
    });

    var searchBoxAdd = new google.maps.places.Autocomplete(document.getElementById('add-input'), {
        bounds: defaultBounds
    });

    var searchBoxDest = [];
    for (var i = 0; i <= 5; i++) {
        searchBoxDest.push = new google.maps.places.Autocomplete(document.getElementById('destination-input' + i), {
            bounds: defaultBounds
        });
    };


    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
	document.getElementById('cleanDD').addEventListener('click', function() {directionsDisplay.setMap(null);directionsDisplay.setPanel(null);initMap();});

    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('btn-ok').addEventListener('click', onChangeHandler);

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        //waypoints
        var waypts = [];
        for (var i = 1; i <= dest; i++) {
            waypts.push({
                location: document.getElementById(strId + i).value,
                stopover: true
            });
        }



        /* Plases */

        var typePlace;

        var infowindow = new google.maps.InfoWindow;
        var service = new google.maps.places.PlacesService(map);

        var markerIco;

        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }


        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                icon: markerIco,
                position: placeLoc
            });

            google.maps.event.addListener(marker, 'click', function() {
				switch (lang) {
						case 'ru': infowindow.setContent('<b>Название:</b> ' + place.name + '<br/>' + '<b>Примерный адрес:</b> ' + place.vicinity); break;
						case 'be': infowindow.setContent('<b>Назва:</b> ' + place.name + '<br/>' + '<b>Прыблізны адрас:</b> ' + place.vicinity); break;
						default: infowindow.setContent('<b>Name:</b> ' + place.name + '<br/>' + '<b>Approximate address:</b> ' + place.vicinity);
					};
                infowindow.open(map, this);
            });
        }

        /* Plases */



        //optimize waypoints
        var optimizeWaypts = document.getElementById('ch1').checked;
        //avoid tolls
        var avoidT = document.getElementById('ch2').checked;
        //alternatives
        var alternatives = document.getElementById('ch3').checked;
        //avoid magistral
        var avoidH = document.getElementById('ch4').checked;
        //geo
        var geocoder = new google.maps.Geocoder();
        var latPoint;
        var lngPoint;

		//waypts check
        console.log(waypts);
		
        directionsService.route({
            origin: document.getElementById('origin-input').value,
            destination: document.getElementById('destination-input0').value,
            waypoints: waypts,
            optimizeWaypoints: optimizeWaypts,
            avoidTolls: avoidT,
            provideRouteAlternatives: alternatives,
            avoidHighways: avoidH,
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: 'bestguess'
            },

            travelMode: 'DRIVING'
        }, function(response, status) {
            switch (status) {
                case 'OK':
                    directionsDisplay.setDirections(response);
                    document.getElementById('directionsPanel').style.visibility = 'visible';
                    document.getElementById('genetation').style.visibility = 'hidden';
                    if (!(document.getElementById("inlineFormSelect").value === "Выбрать..." || document.getElementById("inlineFormSelect").value === "Choose..." || document.getElementById("inlineFormSelect").value === "Выбраць...")) {
                        switch (document.getElementById("inlineFormSelect").value) {
                            case 'Заправки':
                                typePlace = 'gas_station';
                                markerIco = 'img/gas_station.png';
                                break;
                            case 'Парковки':
                                typePlace = 'parking';
                                markerIco = 'img/parking.png';
                                break;
                            case 'Стинции тех. обслуживания':
                                typePlace = 'car_repair';
                                markerIco = 'img/car_repair.png';
                                break;
                            default:
                                $('#warning').modal();
                                $('.modal-body').text('Ошибка выбора дополнительных мест. Не удалось определить выбранный тип мест');
                        }
                        var openPlase = document.getElementById('ch5').checked;
                        geocoder.geocode({
                            'address': document.getElementById('add-input').value
                        }, function(results, status) {
                            if (status == 'OK') {
                                latPoint = results[0].geometry.location.lat();
                                lngPoint = results[0].geometry.location.lng();
                                console.log(latPoint + " " + lngPoint);
                                service.nearbySearch({
                                    location: {
                                        lat: latPoint,
                                        lng: lngPoint
                                    },
                                    radius: 50000,
                                    opennow: openPlase,
                                    type: [typePlace]
                                }, callback);
                                var cityCircle = new google.maps.Circle({
                                    strokeColor: '#007bff',
                                    strokeOpacity: 0.9,
                                    strokeWeight: 2,
                                    fillColor: '#007bff',
                                    fillOpacity: 0.15,
                                    map: map,
                                    center: {
                                        lat: latPoint,
                                        lng: lngPoint
                                    },
                                    radius: 50000
                                });

                            } else {
								$('#warning').modal();
								switch (lang) {
									case 'ru': $('.modal-body').text('Не удалось обнаружить место или лимит исчерпан. Пожалуйста, проверьте правильность написания места, введённого в поле ввода.'); break;
									case 'be': $('.modal-body').text('Не атрымалася выявіць месца або ліміт вычарпаны. Калі ласка, праверце правільнасць напісання месцы, уведзенага ў поле ўводу.'); break;
									default: $('.modal-body').text('Could not find location or limit is reached. Please check the spelling of the place you typed in the input field.');
								};
                            }
                        });
                    }
                    break;
                case 'NOT_FOUND':
					 $('#warning').modal();
					switch (lang) {
						case 'ru': $('.modal-body').text('Не удалось обнаружить одно из указанных мест. Пожалуйста, проверьте правильность написания точек маршрута'); break;
						case 'be': $('.modal-body').text('Не атрымалася выявіць адно з названых месцаў. Калі ласка, праверце правільнасць напісання пунктаў маршруту'); break;
						default: $('.modal-body').text('One of the locations could not be found. Please check the spelling of the route points');
					};
                    break;
                case 'ZERO_RESULTS':
                    $('#warning').modal();
					switch (lang) {
						case 'ru': $('.modal-body').text('Маршрут не найден, либо его невозможно построить по указанным координатам'); break;
						case 'be': $('.modal-body').text('Маршрут не знойдзены, альбо яго немагчыма пабудаваць па ўказаных каардынатах'); break;
						default: $('.modal-body').text('The route was not found, or it is impossible to build it at the specified coordinates');
					};
                    break;
                case 'OVER_QUERY_LIMIT':
					 $('#warning').modal();
					switch (lang) {
						case 'ru': $('.modal-body').text('Извините, но вы использовали слишком много запросов в последнее время. Пожалуйста, повторите попытку позже'); break;
						case 'be': $('.modal-body').text('Выбачайце, але вы выкарыстоўвалі занадта шмат запытаў у апошні час. Калі ласка, паўторыце спробу пазней'); break;
						default: $('.modal-body').text('Sorry, but you\'ve used too many requests recently. Please try again later.');
					};
                    break;
                case 'UNKNOWN_ERROR':
					 $('#warning').modal();
					switch (lang) {
						case 'ru': $('.modal-body').text('Ошибка сервера. Пожалуйста, повторите попытку'); break;
						case 'be': $('.modal-body').text('Памылка сервера. Калі ласка, паспрабуйце яшчэ раз'); break;
						default: $('.modal-body').text('Server error. Please try again');
					};
                    break;
                default:
                    $('#warning').modal();
                    $('.modal-body').text('Directions request failed due to ' + status);
            }
        });
    }

}