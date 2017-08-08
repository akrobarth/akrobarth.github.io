;(function() {

  angular
    .module('app')
    .controller('QcController', function ($scope){
    	$scope.showMenu = false;

    	$scope.toggleMenu = function(){

    		$scope.showMenu = !$scope.showMenu;
    		console.log($scope.showMenu);
    	}
		
    });
})();