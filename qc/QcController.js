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
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW,
                        scale: 5},
                    animation: google.maps.Animation.DROP

                });
                marker.setMap( map ); 

            }     
        }

        function calcRoute(opened, map) {
            
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            var stepDisplay = new google.maps.InfoWindow;

            var start = new google.maps.LatLng(opened.gps.start.lat, opened.gps.start.long);
            var end = new google.maps.LatLng(opened.gps.end.lat, opened.gps.end.long);
            var request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING',
            };
            directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                  directionsDisplay.setDirections(result);
                        var leg = response.routes[ 0 ].legs[ 0 ];
                        makeMarker( leg.start_location, icons.start, "title" );
                        makeMarker( leg.end_location, icons.end, 'title' );
                  showSteps(response, markerArray, stepDisplay, map);
                }
            });
            directionsDisplay.setMap(map);
        };

        function makemarker(){
            
        }

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

