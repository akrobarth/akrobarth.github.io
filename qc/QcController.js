;(function() {

  angular
    .module('app')
    .controller('QcController', function ($scope, resolvedData, $sce, $location){

    	$scope.steps = resolvedData;
        $scope.$sce = $sce;

    	$scope.showMenu = false;
    	$scope.showInsta = false;

        $scope.$on('$viewContentLoaded', function(){
            for (var key in $scope.steps){
                if ($scope.steps[key].id === $location.search().step){
                    $scope.opened = $scope.steps[key];
                    setTimeout(function() {$scope.initMap($scope.opened)}, 10);
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
	            $scope.opened = undefined;
	        } else {
	            $scope.opened = item;
	        }
            var thisId = $scope.opened.id;
            $location.search('step', thisId);
            setTimeout(function() {$scope.initMap($scope.opened)}, 10);
    
		};

		$scope.isOpen = function(item){
	        return $scope.opened === item;
	    };

        $scope.initMap = function(opened) {

            var mapOptions = {
                zoom:12,
                center: {lat: parseFloat(opened.gps.start.lat), lng: parseFloat(opened.gps.start.long)}
            }

            var bounds = new google.maps.LatLngBounds();
            

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
            
            if(opened.gps.end){
                calcRoute(opened, map)
            }else{
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(opened.gps.start.lat, opened.gps.start.long),
                    map: map
                });
                bounds.extend(marker.position);
                map.fitBounds(bounds);
                zoomChangeBoundsListener = 
                google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
                    if (this.getZoom()){
                        this.setZoom(12);
                    }
                });  
            }

            
        }

        function calcRoute(opened, map) {
            
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();

            var start = new google.maps.LatLng(opened.gps.start.lat, opened.gps.start.long);
            var end = new google.maps.LatLng(opened.gps.end.lat, opened.gps.end.long);
            var request = {
                origin: start,
                destination: end,
                travelMode: 'DRIVING'
            };
            directionsService.route(request, function(result, status) {
                if (status == 'OK') {
                  directionsDisplay.setDirections(result);
                }
            });

            directionsDisplay.setMap(map);
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

