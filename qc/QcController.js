;(function() {

  angular
    .module('app')
    .controller('QcController', function ($scope, resolvedData, $sce, $location){

    	$scope.steps = resolvedData;
        $scope.$sce = $sce;

    	$scope.showMenu = false;
    	$scope.showInsta = false;

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
            $location.search('step', thisId)        
		};

		$scope.isOpen = function(item){
	        return $scope.opened === item;
	    };

        $scope.initMap = function() {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 3,
                center: new google.maps.LatLng(26.483, -16.084)
            });
        }

    });
})();