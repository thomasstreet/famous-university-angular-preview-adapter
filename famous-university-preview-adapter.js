var _previousHTMLNode = undefined;
var _errorFlag = false;
window.addEventListener('error',function (err) { _errorFlag = true; console.log(err); });

window._handlerFunctions = {
  css: function(cssString){
    document.querySelector('head').innerHTML = "<style>html, body{margin: 0; padding: 0;} " + cssString + "</style>";
  },
  html: function(htmlString){
    htmlString = "<div>" + htmlString + "</div>";
    var injector = angular.injector(['ng','famous-university']);
    injector.invoke(function($rootScope, $compile, $timeout){
      //grab the container
      var container = document.querySelector('#content-container');

      //remove old compiled node
      if(_previousHTMLNode !== undefined) container.removeChild(_previousHTMLNode);

      //compile new node with Angular hooks
      // debugger
      try {
        var node = $compile(htmlString)($rootScope);
      }
      catch (e) {
        console.log(e)
      }
      //keep track of this new node as the "previous node" for next time
      _previousHTMLNode = node && node[0];

      //actually add the new compiled node to the document
      node && container.appendChild(node[0]);

      //make Angular digest in order to kick everything off
      if(!$rootScope.$$phase)$rootScope.$apply();            
    })
  },
  javascript: function(jsString){
    var oldScript = document.querySelector('#injectable-script');
    var body = document.querySelector('body');
    // console.log('src', oldScript)
    if(oldScript !== null && oldScript !== undefined){
      body.removeChild(oldScript);
    }

    var newScript = document.createElement('script');
    newScript.setAttribute('id', 'injectable-script');
    newScript.setAttribute('type', 'text/javascript');
    newScript.innerHTML = jsString;

    body.appendChild(newScript);
  }
}



window.setFamousContent = function(content) {
  angular.forEach(['javascript', 'css', 'html'], function(prop){
    if(prop !== undefined) _handlerFunctions[prop](content[prop]);
  });
  // Very hacky solution but when the size is set to [undefined,undefined] it resolves only on window resize hance this. This needs attention form famous.
  window.dispatchEvent(new Event('resize'));

  if(_errorFlag) {
    _errorFlag = false;
    window.location.reload();

  }
}

// example call:


// window.setFamousContent({
//   html: "<fa-app ng-controller='TestCtrl' style='width: 320px; height: 568px;'><fa-modifier fa-translate='[0, random300(), 1]' fa-origin='[.5, .5]'><fa-surface fa-size='[20, 20]'><div class='red'>gurl</div></fa-surface></fa-modifier></fa-app>",
//   javascript: "angular.module('famous-university').controller('TestCtrl', function($scope){ $scope.test = 'wooooo!'; $scope.random300 = function(){return Math.random() * 300}})",
//   css: "div.red {background-color: red}"
// });
