angular.module('myApp').directive('govHacker', function(govService) {
  return {
    templateUrl: "./views/hacker.html",
    restrict: "E",
    scope: {
      selector: "="
    },
    link: function (scope, element, attrs){
      scope.buildings = govService.govBuildings;
      scope.dropHidden = true;
      scope.showDropDown = function() {

        scope.myList = [];

        if(scope.dropHidden){
          scope.myList.splice(0)
          scope.myList.push("animated fadeInLeft");
          scope.dropHidden = false;

        }
        else if(!scope.dropHidden){
          scope.myList.splice(0);
          scope.myList.push("animated fadeOutLeft");
          setTimeout(function () {scope.dropHidden = true} , 1000);
        }
      };
      scope.selectB = function(building){
        console.log(building);
        scope.selected = building;
        govService.selected = building;

      };

    }

  };
});
