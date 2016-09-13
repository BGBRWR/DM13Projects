angular.module('myApp').service('govService', function(){
  this.govBuildings = [
    "White House",
    "Washingtong Navy Yard",
    "Smithsonian Instituition",
    "United States Capitol",
    "Congressional Office Building"
  ];
  this.selected;
  this.audio = new Audio('Hacking Sounds.mp3');
});
