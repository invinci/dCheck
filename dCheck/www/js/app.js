// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('dcheck', ['ionic','ngCordova', 'dcheck.controllers','dcheck.directive','dcheck.filters','dcheck.services','ngTagsInput','jett.ionic.filter.bar','onezone-datepicker','ngMessages'])

.run(function($ionicPlatform,$ionicPopup, $timeout,$state,$window, $cordovaNetwork,$rootScope,$cordovaToast,$location,$ionicLoading) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    var type = $cordovaNetwork.getNetwork();
    console.log(type);
    var isOnline = $cordovaNetwork.isOnline();
    console.log(isOnline);
    var isOffline = $cordovaNetwork.isOffline();
    console.log(isOffline);
  


      // Check for network connection
    var CheckInternetConnection = function() {
      console.log("window.Connection");
      console.log(window.Connection);
      if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
          $ionicPopup.show({
            title: NO_INTER_CONNECTION_TITLE,
            content: NO_INTER_CONNECTION_MESSAGE,
            buttons: [{
                  text: '<b>Ok</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    if(ionic.Platform.isIOS()){
                      if(navigator.connection.type == Connection.NONE) {
                        $cordovaToast.showLongBottom(CONNECT_TO_INTERNET);
                        navigator.app.exitApp();
                        //e.preventDefault();
                      }
                    }
                    navigator.app.exitApp();
                  }

              }]
          })
        }
      }
    }
    CheckInternetConnection();
    localStorage.setItem("a","a");

    // listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
      console.log("Online");
    });
     
    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      CheckInternetConnection();
    });

    //One-signal push notification callback
    var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        console.log(jsonData);
        if(!jsonData.notification.isAppInFocus){
          var alertPopup = $ionicPopup.alert({
             title: jsonData.notification.payload.title,
             template: jsonData.notification.payload.body
           });

          alertPopup.then(function(res) {
             return true;
          });
        }else{
          return true;
        }
        
    };
   var notificationRecievedCallback= function(jsonData) {
    //alert("Notification received:\n" + JSON.stringify(jsonData));
    console.log('Did I receive a notification: ' + JSON.stringify(jsonData));
    if(jsonData.isAppInFocus){
       var alertPopup = $ionicPopup.alert({
         title: jsonData.payload.title,
         template: jsonData.payload.body
       });

      alertPopup.then(function(res) {
         return true;
      });
    }else{
      return true;
    }
   
  }
  

    //Initiationg One-signal Push notification
    window.plugins.OneSignal
    .startInit("a4181275-23e8-4a8c-86fb-f89651d5eaec")
    .handleNotificationOpened(notificationOpenedCallback)
    .handleNotificationReceived(notificationRecievedCallback)
    .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
    .endInit();

      
         
      
  });

      $rootScope.$state = $state;
      $rootScope.$location = $location;
      
      function message(to, toP, from, fromP) { 
        return from.name  + angular.toJson(fromP) + " -> " + to.name + angular.toJson(toP);
      }
      
      $rootScope.$on("$stateChangeStart",   function(evt, to, toP, from, fromP)      {

      });
      $rootScope.$on("$stateChangeSuccess", function(evt, to, toP, from, fromP)      { 
           console.log("Success: " + message(to, toP, from, fromP));
           if(from.name=="home" && from.to=="welcometour"){
            $ionicLoading.hide();
           }
      });
      $rootScope.$on("$stateChangeError",   function(evt, to, toP, from, fromP, err) { 
        console.log("Error:   " + message(to, toP, from, fromP), err);

         $ionicLoading.hide();

       });

    / HANDLE ANDROID DEVICE BACK BUTTON -- start. /
    $ionicPlatform.registerBackButtonAction(function (event) { 
           if($state.current.name == "app.testlist" || $state.current.name == "app.dashEmployee" || $state.current.name == "welcometour" || $state.current.name == "app.settings" || $state.current.name == "app.grouplist"  ){
                var confirmPopup = $ionicPopup.confirm({
                  title: 'Warning!',
                  template: EXIT_APP
                });
                confirmPopup.then(function(res)
                 {if(res) {
                  navigator.app.exitApp();
                } else {
                  console.log('You are not sure');
                }
              });  
           }else if($state.current.name == "addcontact" ||$state.current.name =="updatecontactlast"){
                      var confirmPopup = 
                      $ionicPopup.confirm({
                            title: 'Warning!',
                            template: "Are you sure you want to cancel this dCheck?"
                      });
                      confirmPopup.then(function(res)
                           {if(res) {
                            $state.go("app.testlist");
                          } else {
                            console.log('You are not sure');
                          }
                    }); 
                }else{ 
                    navigator.app.backHistory();
              }
          }, 100); 
     / HANDLE ANDROID DEVICE BACK BUTTON -- end. /
      

  

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    cache: false,
    url: '/login',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl',    
    resolve:{
        "check":function($location,LOGINSERVICE,$ionicLoading,$state,$ionicPopup){ 
          console.log("started");
            $ionicLoading.show();
             console.log(localStorage.userId+"undefined");    
              if(localStorage.userId==undefined){ 
                   console.log(localStorage.userId+"undefined");    
                   console.log("hidden");           //check if the user has permission -- This happens before the page loads
                   $ionicLoading.hide();
                    return true;
                }else{
                  console.log("hey")
                    var jsonData={"userId":localStorage.userId}
                    LOGINSERVICE.CheckToken().success(function(data){
                      console.log("hidden");   
                       console.log(data);
                       //$ionicLoading.hide();
                       if(data.keyValue==true){
                          //$location.path('/welcometour');  
                          $state.go("app.testlist");
                       }else{
                        return true;
                       }
                    }).error(function(err){
                       console.log(err);
                       $ionicLoading.hide();
                        var alertPopup = 
                        $ionicPopup.alert({
                          title: 'Error!',
                          template: SERVER_ERROR,
                          buttons: [{
                              text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                              if(navigator){
                                navigator.app.exitApp();
                              }else{
                                ionic.Platform.exitApp();
                              }
                              }
                          }]
                      }); 
                    });
                }
            }
        }
  })
  .state('forget', {
    cache: false,
    url: '/forget',
    templateUrl: 'templates/forget.html',
    controller: 'forgetCtrl'
  })
  .state('app', {  
    cache: false,                                 //appMenuItems for Employees 
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

//For Employees Routes

  .state('testlist', {
      cache: false,
      url: '/testlist',
      templateUrl: 'templates/testlist.html',
      controller : 'testlistCtrl'
   })
  .state('app.testlist', { 
    cache: false,                     
      url: '/dashtestlist',
      views: {
        'menuContent': {
          templateUrl: 'templates/testlist_dash.html',
          controller : 'testlistdashCtrl'
        }
      }
   })
  .state('testhistory', {
      cache: false,
      url: '/testhistory',
      templateUrl: 'templates/testhistory.html',
      controller : 'testhistoryCtrl'
   })

  .state('app.dashEmployee', {
      cache: false,                      
      url: '/dashEmployee',
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html',
          controller : 'dashEmployee'
        }
      }
   })

  .state('welcometour', {                      
    url: '/welcometour',
    cache: false,      
    templateUrl: 'templates/welcometour.html',
    controller: 'welcometourCtrl'
  })

  .state('app.createtest', {
      cache: false,
      url: '/createtest',
      views: {
        'menuContent': {
          templateUrl: 'templates/createtest.html',
          controller: 'createtestCtrl'
        }
      }
    })
  //Add contact details dCheck process
  .state('addcontact', {
      cache: false,
      url: '/addcontact',
      templateUrl: 'templates/addcontact.html',
      controller: 'addcontactCtrl'
      
    })

  //Add result after Contact detail dCheck process
  .state('addcontactlast', {
        cache: false,
        url: '/addcontactlast',
        templateUrl: 'templates/addcontactlast.html',
        controller: 'addcontactlast'
        
      })
  //Add quick dCheck
  .state('updatecontactlast', {
      cache: false,
      url: '/updatecontactlast',
      templateUrl: 'templates/addcontactlast.html',
      controller: 'updatecontactlast'
      
    })
  //Main group listing 
  .state('app.grouplist', {
      cache: false,
      url: '/grouplist',
      views: {
        'menuContent': {
          templateUrl: 'templates/grouplist.html',
          controller: 'grouplistCtrl'
        }
      }
    })
  //Group Listing while dCheck process
  .state('grouplistchecked', {
      cache: false,
      url: '/grouplistchecked',
          templateUrl: 'templates/groupSelect.html',
          controller: 'grouplistcheckedCtrl'
    })
  //Get staff list within the dCheck Scan process
  .state('stafflistchecked', {
      cache: false,
      url: '/stafflistchecked',
          templateUrl: 'templates/employeeList.html',
          controller: 'stafflistcheckedCtrl'
    })
  //get Staff list to create a new group from main group list
   .state('groupStafflist', {
      cache: false,
      url: '/groupStafflist',
          templateUrl: 'templates/groupStafflist.html',
          controller: 'get_existing_staff_list_update_group_Ctrl'
    })
    //Add new employees to the existing group
   .state('addNewStaffToGroup', {
      cache: false,
      url: '/addNewStaffToGroup',
          templateUrl: 'templates/addNewStaffToGroup.html',
          controller: 'add_new_staff_to_existing_group_Ctrl'
    })
   //Get testresult History for Group
   .state('grouphistory', {
      cache: false,
      url: '/grouphistory',
          templateUrl: 'templates/grouphistory.html',
          controller: 'grouphistoryCtrl'
    })
  //Staff list for Edit/Update group staff
  .state('stafflistforgrplist', {
      cache: false,
      url: '/stafflistforgrplist',
          templateUrl: 'templates/employeeList.html',
          controller: 'staff_list_create_new_group_Ctrl'
    })
  //User profile settings
  .state('app.settings', {
      cache: false,
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'settingCtrl'
        }
      }
    })
   .state('staticdata', {
      cache: false,
      url: '/staticdata',
      templateUrl: 'templates/static.html',
      controller: 'staticCtrl'
      
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('groupDetails', {
      url: '/tests',
      templateUrl: 'templates/groupDetails.html',
      //controller: 'groupDetailsCtrl'
    })
  .state('testDetails', {
      url: '/testDetails',
      templateUrl: 'templates/testDetails.html',
      controller: 'testDetailsCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
