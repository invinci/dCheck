angular.module('dcheck.directive', [])



.directive('clickForOptions', ['$ionicGesture', function($ionicGesture) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $ionicGesture.on('swipeleft', function(e){

                // Grab the content
                var content = element[0].querySelector('.item-content');

                // Grab the buttons and their width
                var buttons = element[0].querySelector('.item-options');

                if (!buttons) {
                    console.log('There are no option buttons');
                    return;
                }
                var buttonsWidth = buttons.offsetWidth;

                ionic.requestAnimationFrame(function() {
                    content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

                    if (!buttons.classList.contains('invisible')) {
                        console.log('close');
                        content.style[ionic.CSS.TRANSFORM] = '';
                        setTimeout(function() {
                            buttons.classList.add('invisible');
                        }, 250);                
                    } else {
                        buttons.classList.remove('invisible');
                        content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
                    }
                });     

            }, element);
        }
    };
}])
.directive('phoneInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
})
.directive('onlyAlphabets', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^a-zA-Z\-\s\b]/g, '');
        console.log(transformedInput);
        if (transformedInput !== text) {
          ngModelCtrl.$setViewValue(transformedInput);
          ngModelCtrl.$render();
        }
        return transformedInput; // or return Number(transformedInput)
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  };
})
.directive('wmBlock', function ($parse) {
    return {
        scope: {
          wmBlockLength: '='
        },
        link: function (scope, elm, attrs) {
         
          elm.bind('keypress', function(e){
           
            if(elm[0].value.length > scope.wmBlockLength){
              e.preventDefault();
              return false;
            }
          });
        }
    }   
})
.filter('customNumber', function(){
      return function(input, size) {
        var zero = (size ? size : 2) - input.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + input;
      }
  })
.directive('focusMe', function($timeout) {
    return {link: function(scope, element, attrs) {
    if (attrs.focusMeDisable === "true") {
         return;
    }
    $timeout(function() {
        element[0].focus();
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        console.log("rntered in focus me ");
        cordova.plugins.Keyboard.show(); //open keyboard manually
        }
        }, 350);
     }
    };
})
.directive('replace', function() {
  return {
    require: 'ngModel',
    scope: {
      regex: '@replace',
      with: '@with'
    }, 
    link: function(scope, element, attrs, model) {
      model.$parsers.push(function(val) {
        if (!val) { return; }
        var regex = new RegExp(scope.regex);
        var replaced = val.replace(regex, scope.with); 
        if (replaced !== val) {
          model.$setViewValue(replaced);
          model.$render();
        }         
        return replaced;         
      });
    }
  };
})
.directive('myMaxlength', function() {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      var maxlength = Number(attrs.myMaxlength);
      function fromUser(text) {
          if (text.length > maxlength) {
            var transformedInput = text.substring(0, maxlength);
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
            return transformedInput;
          } 
          return text;
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  }; 
})
.directive('preventscroll', function () {
    return{
        link: link,
        restrict: 'A'
    };

    function link(scope, element, attrs) {
        element.bind( 'mousewheel DOMMouseScroll', function ( e ) {
          console.log(e);
            var e0 = e;//.originalEvent,
            var delta = e0.wheelDelta || -e0.detail;

            this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
            e.preventDefault();
        });
    }
})
   
.directive('searchBar', [function () {
    return {
        scope: {
            ngModel: '='
        },
        require: ['^ionNavBar', '?ngModel'],
        restrict: 'E',
        replace: true,
        template: '<ion-nav-buttons side="right">'+
                        '<div class="searchBar">'+
                            '<div class="searchTxt ios_search"  ng-show="ngModel.show">'+
                                '<div class="bgdiv"></div>'+
                                '<div class="bgtxt">'+
                                    '<input type="text" id="groupsearchtxt" placeholder="Search groups..." ng-model="chargroup" ng-change="serachbygroupname(chargroup)" autofocus>'+
                                '</div>'+
                            '</div>'+
                            '<i class="icon placeholder-icon" ng-click="ngModel.txt=\'\';ngModel.show=!ngModel.show; shownow(ngModel) "></i>'+
                        '</div>'+
                    '</ion-nav-buttons>',
        
        compile: function (element, attrs) {
            var icon=attrs.icon
                    || (ionic.Platform.isAndroid() && 'ion-android-search')
                    || (ionic.Platform.isIOS()     && 'ion-ios-search')
                    || 'ion-search';
            angular.element(element[0].querySelector('.icon')).addClass(icon);
            
            return function($scope, $element, $attrs, ctrls) {
                var navBarCtrl = ctrls[0];
                $scope.navElement = $attrs.side === 'right' ? navBarCtrl.rightButtonsElement : navBarCtrl.leftButtonsElement;
                
            };
        },
        controller: ['$scope','$ionicNavBarDelegate', function($scope,$ionicNavBarDelegate){
            var title, definedClass;
            $scope.$watch('ngModel.show', function(showing, oldVal, scope) {
                if(showing!==oldVal) {
                    if(showing) {
                        if(!definedClass) {
                            var numicons=$scope.navElement.children().length;
                            angular.element($scope.navElement[0].querySelector('.searchBar')).addClass('numicons'+numicons);
                        }
                        
                        title = $ionicNavBarDelegate.getTitle();
                        $ionicNavBarDelegate.setTitle('');
                    } else {
                        $ionicNavBarDelegate.setTitle(title);
                    }
                } else if (!title) {
                    title = $ionicNavBarDelegate.getTitle();
                }
            });
        }]
    };
}]);

angular.module('dcheck.filters', [])
.filter('tel', function () {
    return function (tel) {
        console.log(tel);
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});