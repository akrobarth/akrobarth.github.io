;(function() {

  angular
    .module('app')
    .controller('QcController', function ($scope, resolvedData){

    	$scope.steps = resolvedData;

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
		};

		$scope.isOpen = function(item){
	        return $scope.opened === item;
	    };
    });
})();