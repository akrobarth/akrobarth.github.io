;(function() {

  angular
    .module('app')
    .controller('QcController', function ($scope, resolvedData,resolvedPicsData, $sce, $location){

    	$scope.steps = resolvedData;
        $scope.pics = resolvedPicsData;
        $scope.$sce = $sce;

    	$scope.showMenu = false;
    	$scope.showInsta = false;

        $scope.$on('$viewContentLoaded', function(){
            for (var key in $scope.steps){
                if ($scope.steps[key].id === parseFloat($location.search().step)){
                    $scope.opened = $scope.steps[key];
                    setTimeout(function() {$scope.initMap($scope.opened)}, 10);
                    $scope.getPics($scope.opened);
                }; 
            }
        });
        $scope.goHome = function(){
            $location.search('step', null);
            $scope.opened = '';
        }
    	$scope.toggleMenu = function(){
    		$scope.showMenu = !$scope.showMenu;
    	}

    	$scope.toggleInsta = function(){
    		$scope.showInsta = !$scope.showInsta;
    	}
		
		$scope.open = function(item){
			$scope.showMenu = false;
			if ($scope.isOpen(item)){
	            $scope.opened = item;
	        } else {
	            $scope.opened = item;
	        }
            var thisId = $scope.opened.id;
            $location.search('step', thisId);
            setTimeout(function() {$scope.initMap($scope.opened)}, 10);
            $scope.getPics($scope.opened);
		};

        $scope.getPics = function(opened){
            $scope.openedPics = []; 
            var thisStep = 'step' + opened.id;
            for (key in $scope.pics){
                if ($scope.pics[key].indexOf(thisStep) > 1){
                    $scope.openedPics.push($scope.pics[key]);
                };
            };
        };

		$scope.isOpen = function(item){
	        return $scope.opened === item;
	    };

        $scope.initMap = function(opened) {

            var mapOptions = {
                zoom:12,
                center: {lat: parseFloat(opened.gps.start.lat), lng: parseFloat(opened.gps.start.long)},
            }

            var bounds = new google.maps.LatLngBounds();
            

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            
            if(opened.gps.end){
                calcRoute(opened, map)
            }else{
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(opened.gps.start.lat, opened.gps.start.long),
                    map: map,
                    raiseOnDrag: true,
                    icon: {
                        path: 'M 150 500 C 154 345 149 329 150 150 C 267 320 323 130 433 134 C 461 165 437 244 452 327 C 329 280 305 447 182 348 C 174 377 180 412 177 501 L 151 502' ,
                        fillColor: 'darkGrey',
                        fillOpacity: 0.8,
                        scale: .1,
                        strokeColor: 'black',
                        strokeWeight: 1,
                        anchor: new google.maps.Point(185, 500)},
                    animation: google.maps.Animation.DROP

                });
                marker.setMap( map ); 

            }     
        }

        function calcRoute(opened, map) {

            var lineSymbol = {
                path: google.maps.SymbolPath.CIRCLE,
                fillOpacity: .5,
                scale: 2
            };

            var polylineDotted = new google.maps.Polyline({
                strokeColor: '#000000',
                strokeOpacity: 0,
                fillOpacity: 0,
                icons: [{
                    icon: lineSymbol,
                    offset: '0',
                    repeat: '8px'
                }],
            });
            
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: polylineDotted, suppressMarkers: true, clickable: false });
            var stepDisplay = new google.maps.InfoWindow;

            var start = new google.maps.LatLng(opened.gps.start.lat, opened.gps.start.long);
            var end = new google.maps.LatLng(opened.gps.end.lat, opened.gps.end.long);

            var request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING',
            };

            var startmarker = new google.maps.Marker({
                position: start,
                map: map,
                raiseOnDrag: true,
                    icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 5},
                animation: google.maps.Animation.DROP
            });
            var endmarker = new google.maps.Marker({
                position: end,
                map: map,
                raiseOnDrag: true,
                    icon: {
                    path: 'M 150 500 C 154 345 149 329 150 150 C 267 320 323 130 433 134 C 461 165 437 244 452 327 C 329 280 305 447 182 348 C 174 377 180 412 177 501 L 151 502' ,
                    fillColor: 'darkGrey',
                    fillOpacity: 0.8,
                    scale: .1,
                    strokeColor: 'black',
                    strokeWeight: 1,
                    anchor: new google.maps.Point(185, 500)},
                animation: google.maps.Animation.DROP
            });

            directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                  directionsDisplay.setDirections(result);
                }
            });
            directionsDisplay.setMap(map);
        };

        function showSteps(directionResult, markerArray, stepDisplay, map) {
            var myRoute = directionResult.routes[0].legs[0];
            for (var i = 0; i < myRoute.steps.length; i++) {
              var marker = markerArray[i] = markerArray[i] || new google.maps.Marker({
                    map: map,
                    raiseOnDrag: true,
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                        scale: 5},
                    animation: google.maps.Animation.DROP
              });
              marker.setMap(map);
              marker.setPosition(myRoute.steps[i].start_location);
              attachInstructionText(
                  stepDisplay, marker, myRoute.steps[i].instructions, map);
            }
        }

        function attachInstructionText(stepDisplay, marker, text, map) {
            google.maps.event.addListener(marker, 'click', function() {
              stepDisplay.setContent(text);
              stepDisplay.open(map, marker);
            });
        }

    })
    .filter('object2Array', function() {
    return function(input) {
      var out = []; 
      for(i in input){
        out.push(input[i]);
      }
      return out;
    }
  })
})();

