famous-university-angular-preview-adapter
=========================================

PreviewAdapter for Famo.us/Angular content in Famo.us University

## To use:

`git pull`

`bower install`

and then run in an iframe (or on its own)


#### Example call:

```javascript
window.setFamousContent({
  html: "<fa-app ng-controller='TestCtrl' style='width: 320px; height: 568px;'><fa-modifier fa-translate='[0, random300(), 1]' fa-origin='[.5, .5]'><fa-surface fa-size='[20, 20]'><div class='red'>gurl</div></fa-surface></fa-modifier></fa-app>",
  js: "angular.module('famous-university').controller('TestCtrl', function($scope){ $scope.test = 'wooooo!'; $scope.random300 = function(){return Math.random() * 300}})",
  css: "div.red {background-color: red}"
});
```
