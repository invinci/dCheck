angular.module('dcheck.controllers', [])



//Login Controller
.controller('homeCtrl', function($scope,$ionicPopup, $stateParams,$state,LOGINSERVICE,$timeout,$ionicLoading,$ionicPopup,$window,$rootScope,$cordovaDevice) {
       $scope.dev_width = $window.innerWidth;
       $scope.dev_height = $window.innerHeight;
       $rootScope.deviceheight=$scope.dev_height;
       console.log($scope.dev_width  +" and"+$scope.dev_height);
       var formLogin_height= document.getElementById('form-login').clientHeight;
       var logo_div=$scope.dev_height-formLogin_height-25;
       console.log(logo_div);
       document.getElementById("loginWrap").style.height = logo_div+'px';
       var wrap_logo= document.getElementById('wrap-logo').clientHeight
       var loginWrap= document.getElementById('loginWrap').clientHeight;
       console.log(loginWrap + "@"+ wrap_logo);
       var welcom_box=loginWrap-wrap_logo;
       document.getElementById('welcome-box').style.height = welcom_box + 'px';
        // $ionicLoading.show();
       // Set the default value of inputType
        $scope.inputType = 'password';
        
        //Hide & show password function
        $scope.hideShowPassword = function(){
          if ($scope.inputType == 'password')
            $scope.inputType = 'text';
          else
            $scope.inputType = 'password';
        };
        //localStorage.setItem("userId","fff");
        document.addEventListener("deviceready", function () {
            $scope.device = $cordovaDevice.getDevice();
            $scope.cordova = $cordovaDevice.getCordova();
            $scope.model = $cordovaDevice.getModel();
            $scope.platform = $cordovaDevice.getPlatform();
            $scope.uuid = $cordovaDevice.getUUID();
            //alert($scope.uuid);
            $scope.version = $cordovaDevice.getVersion();

        }, false);


        $scope.loginUser=function  (userData) {
           $ionicLoading.show();
           console.log(userData);
           LOGINSERVICE.Login(userData).success(function(data) {
              console.log(data);
              $ionicLoading.hide();
              if (data.code == 200) {
                  /// alert($scope.uuid);
                   $state.go('welcometour');
                   localStorage.setItem("userData",JSON.stringify(data.userData));
                   $rootScope.user_id=data.userData._id;
                   console.log(data.token);
                   localStorage.setItem("token",JSON.stringify(data.token));
              }else{
                 var alertPopup = $ionicPopup.alert({
                      title: 'Error!',
                      template: data.message,
                      buttons: [{
                          text: 'Ok' ,
                        type: 'button-assertive'
                      }]
                  });
              }
            }).error(function(){
               $ionicLoading.hide();
                var alertPopup = 
                $ionicPopup.alert({
                  title: 'Error!',
                  template: SERVER_ERROR,
                  buttons: [{
                      text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                        $state.go('home'); 
                      }
                  }]
              });      

          });
         
        }

          
        angular.element(document).ready(function () {
            //console.log('page loading completed');
           // $ionicLoading.hide();
        });

        

    
         
        /*$scope.loginUser=function  (userData) {
             $state.go('welcometour');
          }*/
          // function to submit the form after all validation has occurred            
 })

//Forgot Password Controller
.controller('forgetCtrl', function($scope,$ionicPopup, $stateParams) {
 })

//Dashboard Employees
.controller('dashEmployee', function($scope,$ionicPopup,$stateParams,$http,$cordovaFileOpener2,$cordovaInAppBrowser) {
         var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
          };
         $scope.labels = ["Tested Drugs", "In-Store Drugs"];
         $scope.data = [100, 50];

          $scope.movies = [
              'The Dark Knight',
              'Heat',
              'Inception',
              'The Dark Knight Rises',
              'Kill Bill: Vol. 1',
              'Terminator 2: Judgment Day',
              'The Matrix',
              'Minority Report',
              'The Bourne Ultimatum',
          ];
         
            $scope.loadMovies = function(query) {
              return $http.get('css/movies.json');
            };


            $scope.skill={};
            $scope.skill.newSkill="Ravi";
            $scope.skills = [];

            $scope.addSkill = function() {
            
              $scope.skills.push({'title': $scope.skill.newSkill, 'done':false})
              $scope.skill.newSkill = ''
            }

            $scope.deleteSkill = function(index) {  
              $scope.skills.splice(index, 1);
            }


            $scope.download=function(){
              var fileTransfer = new FileTransfer();
              var uri = encodeURI("https://www.languages.dk/archive/pools-m/manuals/final/taskuk.pdf");
              var fileURL=cordova.file.externalRootDirectory + 'Download/' + "a1.pdf";
              fileTransfer.download(
                  uri,
                  fileURL,
                  function(entry) {
                      console.log("download complete: " + entry.toURL());
                  },
                  function(error) {
                      console.log("download error source " + error.source);
                      console.log("download error target " + error.target);
                      console.log("download error code" + error.code);
                  },
                  false,
                  {
                      headers: {
                          "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                      }
                  }
                );
            }
 })

//Cretate Test Employees controller
.controller('createtestCtrl', function($scope, $stateParams,$rootScope,$ionicHistory,$state,$timeout,$ionicLoading,$ionicPopup) {

 })


//addContact/CreateTest tour controller
.controller('addcontactCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate,$ionicGesture,CREATETEST,LOGINSERVICE,$cordovaCamera,$timeout,$ionicLoading,$ionicPopup,$state, $rootScope,$cordovaFileTransfer,$cordovaToast,$ionicScrollDelegate) {
       
       console.log($scope.addContact);
       $scope.show = function() {
          $ionicLoading.show({
            template: 'Loading...',
            duration: 3000
          }).then(function(){
             console.log("The loading indicator is now displayed");
          });
        };
        $scope.hide = function(){
          $ionicLoading.hide().then(function(){
             console.log("The loading indicator is now hidden");
          });
        };


         //Scan QRcode on load
         $scope.scan=function(){
          $scope.show();
           cordova.plugins.barcodeScanner.scan(
              function (result) {
                console.log(result);
                  if(!result.cancelled)
                  {
                      if(result.format == "QR_CODE")
                      {
                         var value = result.text;
                         localStorage.setItem("qrcode",value);
                         $scope.qrcode=value;
                         var qrData={qr_code:value};
                         console.log(qrData);
                         CREATETEST.scanproduct(qrData).success(function(data) {
                              console.log("Data Product");
                              console.log(data);
                              if (data.code == 200) {
                                    $ionicLoading.hide();
                                   //$state.go('addcontact');
                                   //localStorage.setItem("productData",JSON.stringify(data.productData));
                                   $rootScope.productTest=data.productData;
                                   $scope.addContact.productData=data.productData;
                                   console.log(JSON.parse(localStorage.getItem("productData")));
                                   $cordovaToast.showLongBottom('qrCode authenticated Successfully!').then(function(success) {
                                        // success
                                      }, function (error) {
                                        // error
                                      });
                                 }else if(data.code==403){
                                    $ionicLoading.hide();
                                    var alertPopup = 
                                    $ionicPopup.alert({
                                      title: 'Error!',
                                      template: data.message,
                                      buttons: [{
                                          text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                             $ionicLoading.hide();
                                            $state.go('home'); 
                                          }
                                      }]
                                  });
                              }else if(data.code==405){
                                     $ionicLoading.hide();
                                    var alertPopup = 
                                    $ionicPopup.alert({
                                      title: 'Error!',
                                      template: data.message,
                                      buttons: [{
                                          text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                             $ionicLoading.hide();
                                            $state.go('app.testlist'); 
                                          }
                                      }]
                                  });
                              }else{
                                    $ionicLoading.hide();
                                    var alertPopup = 
                                    $ionicPopup.alert({
                                      title: 'Error!',
                                      template: data.message,
                                      buttons: [{
                                          text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                            $ionicLoading.hide();
                                            $state.go('app.testlist'); 
                                          }
                                      }]
                                  });
                              }
                         }).error(function(){
                              $ionicLoading.hide();
                              console.log(SERVER_ERROR);
                              var alertPopup = 
                              $ionicPopup.alert({
                                title: 'Error!',
                                template: SERVER_ERROR,
                                buttons: [{
                                    text: 'Ok' ,
                                  type: 'button-assertive',
                                  onTap: function(e) {
                                      $ionicLoading.hide();
                                      $state.go('app.testlist'); 
                                    }
                                }]
                            });
                              
                         });
                         //$state.go('addcontact');                    
                     }else{
                          $ionicLoading.hide();
                          var alertPopup = 
                          $ionicPopup.alert({
                            title: 'Warning!',
                            template: "Not a valid QRcode. Please try to scan a diffrent one!",
                            buttons: [{
                                text: 'Ok' ,
                              type: 'button-assertive',
                              onTap: function(e) {
                                   $ionicLoading.hide();
                                  $state.go('app.testlist'); 
                                }
                            }]
                        });
                     }
                  }else{
                     $ionicLoading.hide();
                    console.log("cancelled!");
                    $state.go('app.testlist'); 
                  }
              },
              function (error) {
                  console.log("Scanning failed: " + error);
                  $ionicLoading.hide();
                   var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Attention!',
                    template: "dCheck process cancelled!",
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                          $state.go('app.testlist'); 
                        }
                    }]
                });
              }
         );
       }
            //Self calling function(Need to be uncommented for device testing)
            if($rootScope.createTest==undefined||$rootScope.createTest==null||$rootScope.createTest==""){
                  $scope.addContact = {
                    phone :'' ,
                    email:'',
                    tags :[{'title': "Marketting"}]
                 };
                 $scope.scan();
             }else{
                 $scope.addContact=$rootScope.createTest;
                 $rootScope.productTest=$rootScope.productTest;
             }
           
             

              //To open camera and show Image to <div>
              $scope.takePicture = function() {
                  var options = { 
                    quality : 75, 
                    destinationType : Camera.DestinationType.DATA_URL, 
                    sourceType : Camera.PictureSourceType.CAMERA, 
                    allowEdit : true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                  };

                    $cordovaCamera.getPicture(options).then(function(imageData) {
                    console.log(imageData);
                    $scope.addContact.photo="data:image/jpeg;base64,"+imageData;
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    $scope.showNow="yes";
                  }, function(err) {
                      // An error occured. Show a message to the user
                    });
              }

             $scope.addTags=function(){
               $scope.data = {};
               $ionicPopup.show({
                    template: '<input type="text" ng-model="data.tag" style="padding-left: 10px;" my-maxlength="30"  only-alphabets >',
                    title: 'Tags',
                    subTitle: 'Add your Tags',
                    scope: $scope,
                    buttons: [
                      { text: 'Cancel' },
                      {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                          if (!$scope.data.tag) {
                            //don't allow the user to close unless he enters wifi password
                            $ionicPopup.alert({
                               title: 'Required!!',
                               template: 'Please enter a Tag!'
                             }).then(function(res) {
                               console.log('Thank you for not eating my delicious ice cream cone');
                             });
                            e.preventDefault();
                          } else {
                            $scope.addSkill($scope.data.tag);
                           
                          }
                        }
                      }
                    ]
                     });
                }

            
           

            $scope.addSkill = function(skill) {
                $scope.addContact.tags.push({'title': skill});

             }
             $scope.updateSkill = function(tag,index) {
                $scope.addContact.tags[index].title=tag.title;

             }

            $scope.deleteSkill = function(index) { 
                $scope.addContact.tags.splice(index, 1);
            }

            $scope.edittag=function(tag,index){
              console.log(tag);
              console.log(index);
               $scope.index=index;
               $scope.data = tag;
               $ionicPopup.show({
                    template: '<input type="text"  ng-model="data.title" style="padding-left: 10px;" my-maxlength="30"  only-alphabets >',
                    title: 'Tags',
                    subTitle: 'Add your Tags',
                    scope: $scope,
                    buttons: [
                      { text: 'Cancel' },
                      {
                        text: '<b>Update</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                          if (!$scope.data.title) {
                            //don't allow the user to close unless he enters wifi password
                            $ionicPopup.alert({
                               title: 'Required!!',
                               template: 'Please enter a Tag!'
                             }).then(function(res) {
                               console.log('Thank you for not eating my delicious ice cream cone');
                             });
                            e.preventDefault();
                          } else {
                            $scope.updateSkill($scope.data,$scope.index);
                           
                          }
                        }
                      }
                    ]
                });
            }

          //Check email exists
          $scope.check_email_exists=function(email){
              $ionicLoading.show({
                  template: 'Checking email status...'
              });
              var datajson= {"email":email}
              console.log(datajson);
              LOGINSERVICE.Checkemailexists(datajson).success(function(data){
                    $ionicLoading.hide();
                    console.log(data);
                    if(data.code==200){
                      if(data.count==0){
                        console.log(data.message);
                      }else{
                       $ionicPopup.alert({
                          title: 'Error!',
                          template:data.message ,
                          buttons: [{
                              text: 'Ok' ,
                              type: 'button-assertive',
                              onTap: function(e) {
                                $scope.addContact.email="";
                                return false;
                               }
                           }]
                        });
                      }
                    }else if(data.code==403){
                          $ionicLoading.hide();
                          var alertPopup =
                           $ionicPopup.alert({
                              title: 'Error!',
                              template: data.message,
                              buttons: [{
                                  text: 'Ok' ,
                                type: 'button-assertive',
                                onTap: function(e) {
                                     $ionicLoading.hide();
                                    $state.go('home'); 
                                  }
                              }]
                            });
                    }else{
                      $ionicLoading.hide();
                      $ionicPopup.alert({
                            title: 'Error!',
                            template:data.message ,
                            buttons: [{
                                text: 'Ok' ,
                                type: 'button-assertive',
                                onTap: function(e) {
                                  $scope.addContact.email="";
                                  return false;
                                 }
                             }]
                          });
                    }
              }).error(function(err){
                  $ionicLoading.hide();
                  $ionicPopup.alert({
                    title: 'Error!',
                    template:SERVER_ERROR ,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                          $state.go("app.testlist");
                         }
                     }]
                  });
              });
          }
          
          //Signature pad essentials
          var canvas = document.getElementById('signatureCanvas');
          var signaturePad = new SignaturePad(canvas);
          
          $scope.contactAdd = function(form) {
            if(form.$valid) {
              console.log($scope.addContact.photo);
              if($scope.addContact.photo==undefined){
                var alertPopup = 
                $ionicPopup.alert({
                  title: 'Required!',
                  template: "Please upload client image first!",
                  buttons: [{
                     text: 'Ok' ,
                     type: 'button-assertive',
                     onTap: function(e) {
                         $ionicLoading.hide();
                         return false;
                        }
                    }]
                 });
              }else{
                $ionicLoading.show();
                 console.log($scope.addContact);
                 var sigImg = signaturePad.toDataURL();

                 if(sigImg==undefined){
                    $ionicLoading.hide(); 
                    var alertPopup = 
                    $ionicPopup.alert({
                      title: 'Required!',
                      template: "Please add client signature first!",
                      buttons: [{
                         text: 'Ok' ,
                         type: 'button-assertive',
                         onTap: function(e) {
                             $ionicLoading.hide();
                             return false;
                            }
                        }]
                     });
                 }else{
                    $scope.addContact.signature = sigImg;
                    $rootScope.createTest=$scope.addContact;
                    $timeout(function(){
                      $ionicLoading.hide();
                      $state.go('addcontactlast');
                    },1000);
                 }
              }
            }
          };

        //Clear Signatuer pad 
        $scope.clearCanvas = function() {
          signaturePad.clear();
        }
        //Save Signature pad
        $scope.saveCanvas = function() {
            var sigImg = signaturePad.toDataURL();
            $scope.signature = sigImg;
        }

        $scope.onDrag = function () { 
            $ionicScrollDelegate.freezeAllScrolls(true);   
        }                      
        $scope.onRelease = function () {  
            $ionicScrollDelegate.freezeAllScrolls(false);     
        }
 })

//addcontactlast  controller
.controller('addcontactlast', function($scope, $stateParams, $rootScope, $ionicSlideBoxDelegate,$cordovaCamera,$timeout,$ionicLoading,$ionicPopup,$state,CREATETEST,$cordovaInAppBrowser,$cordovaFileOpener2,$cordovaFileTransfer, $cordovaFile,$cordovaToast) {
      $scope.saveResult = {};  
      $scope.saveResult={
        date:new Date()
      }
      $scope.goback=function(){
        var confirmPopup = $ionicPopup.confirm({
         title: 'Warning!',
         template: 'Are you sure you want edit contact details?'
       });

         confirmPopup.then(function(res) {
           if(res) {
             console.log('You are sure');
             $state.go('addcontact');
           } else {
             console.log('You are not sure');
             return true;
           }
         });
        
      }   

      //To open camera and show Image to <div>
      $scope.takePicture = function() {
          var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.saveResult.product_image="data:image/jpeg;base64,"+imageData;
            console.log(imageData);
            var d = document.getElementById("addConatct");
            console.log(document.getElementById("addConatct"));
            d.className += " pad_20";
            console.log(document.getElementById("addConatct"));
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.showNow="yes";
          }, function(err) {
                // An error occured. Show a message to the user
            });
     }

     

     $scope.onezoneDatepicker = {
            date: new Date(), // MANDATORY                     
            mondayFirst: false,                
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],                    
            daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],     
            startDate: new Date(2016, 1, 15),             
            endDate: new Date(),                    
            disablePastDays: false,
            disableSwipe: false,
            disableWeekend: false,
            //disableDates: [new Date(2016, 1, 15), new Date(2016, 2, 16), new Date(2016, 3, 17)],
            //disableDaysOfWeek: disableDaysOfWeek,
            showDatepicker: false,
            showTodayButton: true,
            calendarMode: false,
            hideCancelButton: true,
            hideSetButton: true,
            highlights: [
            {
                date: new Date(2016, 1, 7),
                color: '#8FD4D9',
                textColor: '#fff'
            },
            {
                date: new Date(2016, 1, 18)
            },
            {
                date: new Date(2016, 1, 19)
            },
            {
                date: new Date(2016, 1, 20)
            }
        ]
        ,
            callback: function(value){
                // your code
                console.log(value);
                $scope.saveResult.date=value;
            }
      };


       $scope.downloaddCheck=function(url){
        $ionicLoading.show({
              template: 'downloading...'
          });
        //var url = "https://www.languages.dk/archive/pools-m/manuals/final/taskuk.pdf";    
        // File name only     
         var filename = url.split("/").pop(); 
          console.log(cordova.file.dataDirectory);
          var targetPath = cordova.file.externalRootDirectory + "/Offuz/" + filename;
          // var targetPath =cordova.file.dataDirectory + "/dCheck/" + filename;      
          var trustHosts = true;
          var options = {};

          $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
            .then(function(result) {

              console.log(result);

              $cordovaFileOpener2.open(
                         result.nativeURL,
                        'application/pdf'
                      ).then(function() {
                        $ionicLoading.hide();
                         $state.go('app.testlist');
                        console.log("SUCCESS");
                      }, function(e) {
                        console.log("ERROR");
                        console.log(JSON.stringify(e));
                      });
              // Success!
            }, function(err) {
              console.log(err);
              // Error
            }, function (progress) {
              var downloadProgress = (progress.loaded / progress.total) * 100;
              $ionicLoading.show({
                  template: "Downloaded：" + Math.floor(downloadProgress) + "%"
              });
              if (downloadProgress >= 100) {
                  $ionicLoading.hide();
              }
            });
                   
           }

       // A confirm dialog
       $scope.showConfirm = function(url) {
        $rootScope.url=url;
         
         var confirmPopup = $ionicPopup.confirm({
           title: 'dCheck created successfully!',
           template: 'Are you sure you want to share this dCheck?'
         });

         confirmPopup.then(function(res) {
           if(res) {
            //var pdfPath=$rootScope.pdfPath;
            //$scope.downloaddCheck(pdfPath);

               $state.go('grouplistchecked');
               //window.open("http://getoddjob.com/help/", "_system");
           } else {
             console.log('You are not sure');
             $state.go('app.testlist');
           }
         });
       };


    

          //Save dCheck with result and contact info
          $scope.testResult={};
          $scope.addResult = function(form) {
            
            if(form.$valid) {
              if($scope.saveResult.product_image==undefined){
                var alertPopup = $ionicPopup.alert({
                                    title: 'Required!',
                                    template: "Please Upload result Image First!",
                                    buttons: [{
                                        text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                           $ionicLoading.hide();
                                           return false;
                                          }
                                      }]
                                  });
                
              }else{
              $ionicLoading.show();
              var testdatetime=new Date($scope.saveResult.date.getFullYear(),$scope.saveResult.date.getMonth(),$scope.saveResult.date.getDate(),$scope.saveResult.time.getHours(),$scope.saveResult.time.getMinutes());
              $scope.saveResult.datetime=testdatetime;
              
              console.log($scope.saveResult);
              console.log("");
              console.log(JSON.parse(localStorage.getItem("userData")));

              var user=JSON.parse(localStorage.getItem("userData"));    //Staff data
              var contactData=$rootScope.createTest;                    //Client data contact
              var productData=$rootScope.productTest;                   //Product data
              var saveLastContactdata=$scope.saveResult;
              
              $scope.testResult={
                 fileCount:2,
                 user_id: user._id,
                 product_id: productData._id,
                 name:contactData.clientname  ,
                 email:contactData.email,
                 phone_number:contactData.phone,
                 tags:contactData.tags,
                 datetime:saveLastContactdata.datetime,
                 location:saveLastContactdata.place,
                 job:saveLastContactdata.job,
                 images: {
                           "product_image": 
                            {
                               "base64": saveLastContactdata.product_image,
                                "ext": "jpg"
                            },
                            "photo": 
                            {
                              "base64": contactData.photo,
                              "ext": "jpg"
                            },
                            "signature":
                            {
                              "base64": contactData.signature,
                              "ext": "png"
                            }

                          }
                  }            
              console.log("$scope.testResult");   
              console.log($scope.testResult);
              CREATETEST.saveresults($scope.testResult).success(function(data){
                  $ionicLoading.hide();
                  console.log(data);
                  if (data.code == 200) {
                    console.log(data);
                    $rootScope.testData_response=data;
                    $rootScope.producttest_id=data.insertdata._id;
                    console.log("here is the proof"+$rootScope.producttest_id);
                    $rootScope.pdfPath=data.pdfPath;
                    $scope.showConfirm(data.pdfPath);
                  }else if(data.code==403){
                         $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: data.message,
                        buttons: [{
                            text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                               $ionicLoading.hide();
                              $state.go('home'); 
                            }
                        }]
                      });
                    }else{
                     var alertPopup = $ionicPopup.alert({
                                        title: 'Error!',
                                        template: data.message,
                                        buttons: [{
                                            text: 'Ok' ,
                                            type: 'button-assertive',
                                            onTap: function(e) {
                                               return false;
                                              }
                                          }]
                                  });
                  }
                 }).error(function(){
                       var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template: SERVER_ERROR,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                return false;
                             }
                         }]
                      });
                });
             }
          }
        }; 

          $timeout(function(){
            var date = new Date();
            var currentTime = date.getHours() + ':' + date.getMinutes();
            $scope.saveResult.time=new Date(1970, 0, 1, date.getHours(), date.getMinutes());
            }, 0);
 })

//Quick dCheck process for existing USER
.controller('updatecontactlast', function($scope, $stateParams, $rootScope, $ionicSlideBoxDelegate,$cordovaCamera,$timeout,$ionicLoading,$ionicPopup,$state,$cordovaToast,CREATETEST,$cordovaInAppBrowser,$cordovaFileOpener2,$cordovaFileTransfer, $cordovaFile,LISTTESTHISTORY) {
      console.log($rootScope.existingtest._id);
      $scope.saveResult = {};  
      $scope.saveResult={
        date:new Date()
      }
      $scope.goback=function(){
        var confirmPopup = $ionicPopup.confirm({
         title: 'Warning!',
         template: 'Are you sure you want ti cancel the dCheck?'
       });

         confirmPopup.then(function(res) {
           if(res) {
             console.log('You are sure');
             $state.go('app.testlist');
           } else {
             console.log('You are not sure');
             return true;
           }
         });
        
      }   


      //Scan QRcode on load
         $scope.scan=function(){
          $ionicLoading.show();
           cordova.plugins.barcodeScanner.scan(
              function (result) {
                console.log(result);
                  if(!result.cancelled)
                  {
                      if(result.format == "QR_CODE")
                      {
                         var value = result.text;
                         localStorage.setItem("qrcode",value);
                         $scope.qrcode=value;
                         var qrData={qr_code:value};
                         console.log(qrData);
                         CREATETEST.scanproduct(qrData).success(function(data) {
                              console.log(data);
                              if (data.code == 200) {
                                   $ionicLoading.hide();
                                   //$state.go('addcontact');
                                   //localStorage.setItem("productData",JSON.stringify(data.productData));
                                   $rootScope.productTest=data.productData;
                                   //$scope.addContact.productData=data.productData;
                                   console.log(JSON.parse(localStorage.getItem("productData")));
                                   var datajson={product_testId:$rootScope.existingtest._id}
                                   LISTTESTHISTORY.showexistingtest(datajson).success(function(data){
                                       $ionicLoading.hide();
                                      if (data.code == 200) {
                                          console.log("productprevious data");
                                         
                                          console.log(data);
                                          $rootScope.previoustestdata=data.data;
                                      }else{
                                           $ionicLoading.hide();
                                          var alertPopup = $ionicPopup.alert({
                                          title: 'Error!',
                                          template: data.message,
                                          buttons: [{
                                              text: 'Ok' ,
                                            type: 'button-assertive',
                                            onTap: function(e) {
                                               
                                                $state.go('app.testlist'); 
                                              }
                                          }]
                                        });
                                       }
                                   }).error(function(err){
                                        console.log(err);
                                   });
                                   $cordovaToast.showLongBottom('qrCode authenticated Successfully!').then(function(success) {
                                        // success
                                      }, function (error) {
                                        // error
                                      });
                                 }else if(data.code==403){
                                       $ionicLoading.hide();
                                      var alertPopup = $ionicPopup.alert({
                                      title: 'Error!',
                                      template: data.message,
                                      buttons: [{
                                          text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                             $ionicLoading.hide();
                                            $state.go('home'); 
                                          }
                                      }]
                                    });
                                  }else if(data.code==405){
                                     $ionicLoading.hide();
                                    var alertPopup = $ionicPopup.alert({
                                      title: 'Error!',
                                      template: data.message,
                                      buttons: [{
                                          text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                             $ionicLoading.hide();
                                            $state.go('app.testlist'); 
                                          }
                                      }]
                                  });
                              }else{
                                       $ionicLoading.hide();
                                          var alertPopup = $ionicPopup.alert({
                                            title: 'Error!',
                                            template: data.message,
                                            buttons: [{
                                                text: 'Ok' ,
                                              type: 'button-assertive',
                                              onTap: function(e) {
                                                  
                                                  $state.go('app.testlist'); 
                                                }
                                            }]
                                        });
                               }
                         }).error(function(){
                           $ionicLoading.hide();
                             console.log(SERVER_ERROR);
                              var alertPopup = $ionicPopup.alert({
                                      title: 'Error!',
                                      template: SERVER_ERROR,
                                      buttons: [{
                                          text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                           
                                            $state.go('app.testlist'); 
                                          }
                                      }]
                                  });
                              
                         });
                         //$state.go('addcontact');                    
                      }else{
                        $ionicLoading.hide();
                        var alertPopup = 
                        $ionicPopup.alert({
                          title: 'Warning!',
                          template: "Not a valid QRcode. Please try with other one.",
                          buttons: [{
                              text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                $state.go('app.testlist'); 
                              }
                          }]
                      });
                 }
                  }else{
                    console.log("cancelled!");
                    $state.go('app.testlist'); 
                  }
              },
              function (error) {
                  console.log("Scanning failed: " + error);
                   $ionicLoading.hide();
                   var alertPopup = $ionicPopup.alert({
                                      title: 'Attention!',
                                      template: "dCheck process cancelled!",
                                      buttons: [{
                                          text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                           
                                            $state.go('app.testlist'); 
                                          }
                                      }]
                                  });
              }
         );
       }
        //Self calling function(Need to be uncommented for device testing)
        $scope.scan();

      //To open camera and show Image to <div>
      $scope.takePicture = function() {
          var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.DATA_URL, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.saveResult.product_image="data:image/jpeg;base64,"+imageData;
            console.log(imageData);
            var d = document.getElementById("addConatct");
            console.log(document.getElementById("addConatct"));
            d.className += " pad_20";
            console.log(document.getElementById("addConatct"));
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.showNow="yes";
          }, function(err) {
                // An error occured. Show a message to the user
            });
     }

     

     $scope.onezoneDatepicker = {
            date: new Date(), // MANDATORY                     
            mondayFirst: false,                
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],                    
            daysOfTheWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],     
            startDate: false,             
            endDate: new Date(),                    
            disablePastDays: false,
            disableSwipe: false,
            disableWeekend: false,
            disableDates: [new Date(2016, 1, 15), new Date(2016, 2, 16), new Date(2016, 3, 17)],
            //disableDaysOfWeek: disableDaysOfWeek,
            showDatepicker: false,
            showTodayButton: true,
            calendarMode: false,
            hideCancelButton: true,
            hideSetButton: true,
            highlights: [
            {
                date: new Date(2016, 1, 7),
                color: '#8FD4D9',
                textColor: '#fff'
            },
            {
                date: new Date(2016, 1, 18)
            },
            {
                date: new Date(2016, 1, 19)
            },
            {
                date: new Date(2016, 1, 20)
            }
        ]
        ,
            callback: function(value){
                // your code
                console.log(value);
                $scope.saveResult.date=value;
            }
      };



       // A confirm dialog
       $scope.showConfirm = function(url) {
        $rootScope.url=url;
         
         var confirmPopup = $ionicPopup.confirm({
           title: 'dCheck created successfully!',
           template: 'Are you sure you want to share this dCheck?'
         });

         confirmPopup.then(function(res) {
           if(res) {
            //var pdfPath=$rootScope.pdfPath;
            //$scope.downloaddCheck(pdfPath);

               $state.go('grouplistchecked');
               //window.open("http://getoddjob.com/help/", "_system");
           } else {
             console.log('You are not sure');
             $state.go('app.testlist');
           }
         });
       };



          //Save dCheck with result and contact info
          $scope.testResult={};
          $scope.addResult = function(form) {
            if(form.$valid) {
              if($scope.saveResult.product_image==undefined){
                var alertPopup = $ionicPopup.alert({
                                    title: 'Required!',
                                    template: "Please Upload result Image First!",
                                    buttons: [{
                                        text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                           $ionicLoading.hide();
                                           return false;
                                          }
                                      }]
                                  });
                
              }else{
              $ionicLoading.show();
              var testdatetime=new Date($scope.saveResult.date.getFullYear(),$scope.saveResult.date.getMonth(),$scope.saveResult.date.getDate(),$scope.saveResult.time.getHours(),$scope.saveResult.time.getMinutes());
              $scope.saveResult.datetime=testdatetime;
              
              console.log($scope.saveResult);
              console.log("");
              console.log(JSON.parse(localStorage.getItem("userData")));

              var user=JSON.parse(localStorage.getItem("userData"));    //Staff data
              var existinguserdata=$rootScope.existingtest;
              console.log(existinguserdata);
              var productData=$rootScope.productTest;                   //Product data
              var previoustestdata=$rootScope.previoustestdata;         //Previous test data
              console.log(previoustestdata);
              var saveLastContactdata=$scope.saveResult;
              var datajson={
                  "product_id":productData._id,
                  "producttestusers_id":existinguserdata._id,
                  "datetime":saveLastContactdata.datetime,
                  //"tags":previoustestdata.tags,
                  "location":saveLastContactdata.place,
                  "job":saveLastContactdata.job,
                  "images":{"product_image":{
                      "base64":saveLastContactdata.product_image,
                      "ext": "jpg"
                   }
                 }
                }
              console.log("previoustestdata");   
              console.log(datajson);
              CREATETEST.addtestexisting(datajson).success(function(data){
                  $ionicLoading.hide();
                  console.log(data);
                  if (data.code == 200) {
                    console.log(data);
                    $rootScope.testData_response=data;
                    $rootScope.producttest_id=data.insertdata._id;
                    console.log("here is the proof"+$rootScope.producttest_id);
                    $rootScope.pdfPath=data.pdfPath;
                    $scope.showConfirm(data.pdfPath);
                  }else if(data.code==403){
                     $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                           $ionicLoading.hide();
                          $state.go('home'); 
                        }
                    }]
                  });
                }else{
                     var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template: data.message,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                             return false;
                            }
                        }]
                     });
                   }
                 }).error(function(){
                       var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template: SERVER_ERROR,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                return false;
                             }
                         }]
                      });
                });
             }
          }
        }; 



          $timeout(function(){
            var date = new Date();
            var currentTime = date.getHours() + ':' + date.getMinutes();
            $scope.saveResult.time=new Date(1970, 0, 1, date.getHours(), date.getMinutes());
            }, 0);
 })

.controller('staticCtrl', function($scope, $ionicModal, $timeout,$state,$rootScope,$ionicPopup) {
         console.log($rootScope.testData_response);
         $scope.pdfdata=$rootScope.testData_response.insertdata;
         $scope.qr_codePath=$rootScope.testData_response.qr_codePath;
         $scope.userpic=$rootScope.testData_response.photoPath;
         $scope.testpic=$rootScope.testData_response.product_imagePath;
 })

///TestList Employees Controller
.controller('testlistCtrl', function($scope, $stateParams,$timeout,$ionicFilterBar,$ionicHistory, $ionicConfig, $state,$location,$ionicScrollDelegate, $log,$ionicFilterBarConfig,$timeout,$ionicLoading,LISTTESTHISTORY,$ionicPopup,$rootScope,$anchorScroll) {
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
    $scope.quantity=7;
    $scope.show_overlay=false;
 

    $scope.users=[];
   
    //Click letter event
    $scope.gotoList = function(id){
      console.log(id);
      $location.hash(id);
      $ionicScrollDelegate.anchorScroll(true);
    }

    //Create alphabet object
    function iterateAlphabet()
    {
       var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
       var numbers = new Array();
       for(var i=0; i<str.length; i++)
       {
          var nextChar = str.charAt(i);
         // console.log(nextChar);
          numbers.push(nextChar);
       }
       return numbers;
    }
    $scope.groups = [];
    for (var i=0; i<10; i++) {
      $scope.groups[i] = {
        name: i,
        items: []
      };
      for (var j=0; j<3; j++) {
        $scope.groups[i].items.push(i + '-' + j);
      }
    }
  
    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };



      //to dynamically sort an array of objects Ascending order
     function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
     }

   //Sorting userlist in Alphabetic order
    $scope.afterData=function(){
        $scope.users=$scope.users.sort(dynamicSort("name"));
        var users = $scope.users;
        var log = [];
        $scope.alphabet = iterateAlphabet();

        //Sort user list by first letter of name
        var tmp={};
        for(i=0;i<users.length;i++){
          
          var letter=users[i].name.toUpperCase().charAt(0);
          //console.log(letter);
          if( tmp[ letter] ==undefined){
            tmp[ letter]=[]
          }
            tmp[ letter].push( users[i] );
        }
        $rootScope.letter=tmp;

        $ionicLoading.hide();
        $scope.sorted_users = tmp;
   }
     

      $scope.gettestHistory=function(data){
        $ionicLoading.show();
        LISTTESTHISTORY.testlisthistory(data).success(function(data){
              console.log(data);
              if(data.code==200){
                $scope.user=data.responseData;
                console.log("f"+$scope.user);
                if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                  console.log("its done");
                  $scope.moreDataCanBeLoaded=false;
                }else{
                  $scope.moreDataCanBeLoaded=true;
                }
                  $scope.shownothing=false;
                  /*if(data.responseData<10){
                      $rootScope.stopnow="true";

                  }*/
                angular.forEach(data.responseData, function(resdata){
                   $scope.users.push(resdata);
                });
                $ionicLoading.hide();
                $scope.afterData();
                
                
              }else if(data.code==403){
                 $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: data.message,
                buttons: [{
                    text: 'Ok' ,
                  type: 'button-assertive',
                  onTap: function(e) {
                       $ionicLoading.hide();
                      $state.go('home'); 
                    }
                }]
              });
            }else{
                var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template:data.message ,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {

                            $state.go("app.testlist");
                            return false;
                         }
                     }]
                  });
              }
          }).error(function(err){
              console.log(err);
              var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template: SERVER_ERROR,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $state.go("app.testlist");
                            return false;
                         }
                     }]
                  });
          });
    }



    $scope.filter=function(char){
       var array1=$rootScope.letter; 
       if (char in array1){
        return false;
       }else{
        return true;
       }
    }



    $scope.gettestHistoryFilter=function(data){
      
      LISTTESTHISTORY.testlisthistory(data).success(function(data){
            console.log(data.responseData);
            if(data.code==200){
              $scope.users=data.responseData;
              $scope.afterData();
            }else if(data.code==403){
               $ionicLoading.hide();
              var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: data.message,
              buttons: [{
                  text: 'Ok' ,
                type: 'button-assertive',
                onTap: function(e) {
                     $ionicLoading.hide();
                    $state.go('home'); 
                  }
              }]
            });
          }else{
              var alertPopup = 
                 $ionicPopup.alert({
                  title: 'Error!',
                  template:data.message ,
                  buttons: [{
                      text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {

                          $state.go("app.testlist");
                          return false;
                       }
                   }]
                });
            }
        }).error(function(err){
            console.log(err);
            var alertPopup = 
                 $ionicPopup.alert({
                  title: 'Error!',
                  template: SERVER_ERROR,
                  buttons: [{
                      text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                          $state.go("app.testlist");
                          return false;
                       }
                   }]
                });
        });
    }


      //Load Test History
      $scope.users=[];
      $scope.loadtesthistory=function(){
          $ionicLoading.show();
          console.log(JSON.parse(localStorage.getItem("userData")));
          var userData=JSON.parse(localStorage.getItem("userData"));
          console.log(userData._id);
          $scope.userid=userData._id;
          $scope.page_no=0;
          var data={
                    "user_id":$scope.userid,
                    "page_no":$scope.page_no,
                    "limit":10
                   };
          console.log(data);
          $scope.gettestHistory(data);
       }

      //Self calling function for Test History listing
      $ionicLoading.show();
      $scope.loadtesthistory();



   
    //Load more function for paginated data
     $scope.loadMore = function() {
        $ionicLoading.show({
          template: "Downloading..."
        });
        if($rootScope.stopnow=="true"){
          $ionicLoading.hide();
          console.log("Sorry bro!");
          return true;
        }
         console.log("loadmore");
         $scope.page_no=$scope.page_no+1;
         var data={"user_id":$scope.userid,
                    "page_no":$scope.page_no,
                    "limit":10
                   };
        $scope.gettestHistory(data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      };

      /*$scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
      });*/




      //Filterration process Starts
      $scope.showtabs=true;
      $scope.showFilterBarName=function  (argument) {
        $scope.show_overlay=true;
        $scope.showtabs=false;
        $scope.showname=true;
        $scope.showtags=false;
      }
      $scope.showFilterBarTag=function(searchname){
        $scope.show_overlay=true;
        $scope.showtabs=false;
        $scope.showname=false;
        $scope.showtags=true;
      }

      $scope.searchbyname=function(searchname){
        $scope.show_overlay=false;
        console.log(searchname);
        var userData=JSON.parse(localStorage.getItem("userData"));
        console.log(userData._id);
        $scope.userid=userData._id;
        var data={
          "user_id":$scope.userid,
          "page_no": 0,
          "limit": 10, 
          "nameSearch":searchname.toLowerCase()
        }
        console.log(data);
        $scope.gettestHistoryFilter(data);
      }

      $scope.searchbytag=function(searchtag){
        $scope.show_overlay=false;
        console.log(searchtag);
        var userData=JSON.parse(localStorage.getItem("userData"));
        console.log(userData._id);
        $scope.userid=userData._id;
        var data={
          "user_id":$scope.userid,
          "page_no": 0,
          "limit": 10, 
          "tagSearch":searchtag.toLowerCase()
        }
        console.log(data);
        $scope.gettestHistoryFilter(data);
      }

      $scope.hideSearch=function(){
        $scope.showtabs=true;
        $state.go($state.current, {}, {reload: true});
      }
      //Filterration process Ends


      

      //Back button navbar
      $scope.myGoBack = function() {
       $state.go('app.testlist');
       $ionicHistory.goBack();
      };


     //Option Click delete
      $scope.delete = function(item,$index) {
        console.log('Delete Item: ' + item._id +"    Index"+ $index);
      };

      $scope.alert=function(){
        alert("");
      }


     $scope.show = function() {
        $ionicLoading.show({
          template: 'Loading...',
          duration: 3000
        }).then(function(){
           console.log("The loading indicator is now displayed");
        });
      };
      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
        });
      };

      
          //$state.go($state.current, {}, {reload: true});
      
       /* $scope.show();
        $timeout(function(){
           $ionicLoading.hide();
        }, 3000);*/
 })


///History Dashboard Controller
.controller('testlistdashCtrl', function($scope, $stateParams,$timeout,$ionicFilterBar,$ionicHistory, $ionicConfig, $state,$location,$ionicScrollDelegate, $log,$ionicFilterBarConfig,$timeout,$ionicLoading,LISTTESTHISTORY,CREATETEST,MENUSERVICE,$ionicPopup,$rootScope,$ionicPopover) {
      $scope.shouldShowDelete = false;
      $scope.shouldShowReorder = false;
      $scope.listCanSwipe = true;
      $scope.quantity=7;
      $scope.show_overlay=false;
      $scope.nothingtoshow=false;
      $scope.pageno=0;
      $scope.dataparam=0;
      $scope.char_to_search="all";
      $scope.popover;
      $ionicPopover.fromTemplateUrl('templates/popover.html', {
          scope: $scope,
        }).then(function(popover) {
          $scope.popover = popover;
        });
      

      //Filterration process Starts
      $scope.showtabs=true;
      $scope.hideoverlay=function(){
        $scope.show_overlay=false;
        $scope.showtabs=false;
        $scope.showname=false;
        $scope.showtags=true;
        $state.go($state.current, {}, {reload: true});         //reload state
      }

      $scope.showFilterBarName=function  (e) {
        $scope.show_overlay=true;
        $scope.showtabs=false;
        $scope.showname=true;
        $scope.showtags=false;
       $scope.popover.hide();
        $timeout(function () {          
          document.getElementById('searchname').select();
          cordova.plugins.Keyboard.show();     
         }, 0);
      }
      $scope.showFilterBarTag=function(searchname){
        $scope.focusInput=true;
        $scope.show_overlay=true;
        $scope.showtabs=false;
        $scope.showname=false;
        $scope.showtags=true;
        $scope.popover.hide();
        $timeout(function () {          
          document.getElementById('searchtag').select();  
           cordova.plugins.Keyboard.show();   
         }, 0);
      }

      $scope.searchbyname=function(searchname){
        $ionicLoading.show({
            template: 'Loading...',
          })
        $scope.show_overlay=false;
        console.log(searchname);
        var userData=JSON.parse(localStorage.getItem("userData"));
        console.log(userData._id);
        $scope.userid=userData._id;
        var data={
          "user_id":$scope.userid,
          "page_no": 0,
          "limit": 500, 
          "nameSearch":searchname.toLowerCase()
        }
        console.log(data);
        $scope.gettestHistoryFilter(data);
      }

      $scope.searchbytag=function(searchtag){
        $ionicLoading.show({
            template: 'Loading...',
          })
        $scope.show_overlay=false;
        console.log(searchtag);
        var userData=JSON.parse(localStorage.getItem("userData"));
        console.log(userData._id);
        $scope.userid=userData._id;
        var data={
          "user_id":$scope.userid,
          "page_no": 0,
          "limit": 500, 
          "tagSearch":searchtag.toLowerCase()
        }
        console.log(data);
        $scope.gettestHistoryFilter(data);
      }

      $scope.hideSearch=function(){
        console.log("gfgf");
        $scope.popover.hide();
         $scope.show_overlay=false;
        $scope.showtabs=true;
        $state.go($state.current, {}, {reload: true});         //reload state
      }
      //Filterration process Ends


     //Option Click delete
      $scope.delete = function(item,$index) {
        console.log('Delete Item: ' + item._id +"    Index"+ $index);
      };

     ///Ionic loading starts
     $scope.show = function() {
        $ionicLoading.show({
          template: 'Loading...',
          duration: 3000
        }).then(function(){
           console.log("The loading indicator is now displayed");
        });
      };
      $scope.hide = function(){
        $ionicLoading.hide().then(function(){
           console.log("The loading indicator is now hidden");
        });
      }; 
      ///Ionic loading Ends
      $scope.filter1=function(char){
         var array1=$rootScope.letter; 
         if (char in array1){
          return false;
         }else if(char=="All"){
          return false;
         }else{
          return true;
         }
      }

      $scope.users=[];
     

      //Create alphabet object
      function iterateAlphabet()
      {
       var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
       var numbers = new Array();
       for(var i=0; i<str.length; i++)
       {
         var nextChar = str.charAt(i);
         numbers.push(nextChar);
       }
       return numbers;
      }
      $scope.groups = [];
      for (var i=0; i<10; i++) {
        $scope.groups[i] = {
          name: i,
          items: []
        };
        for (var j=0; j<3; j++) {
          $scope.groups[i].items.push(i + '-' + j);
        }
      }
    
      /*
       * if given group is the selected group, deselect it
       * else, select the given group
       */
      $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
           $scope.shownGroup = null;
        } else {
           $scope.shownGroup = group;
        }
      };
      $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
      };



      //to dynamically sort an array of objects Ascending order
      function dynamicSort(property) {
          var sortOrder = 1;
          if(property[0] === "-") {
              sortOrder = -1;
              property = property.substr(1);
          }
          return function (a,b) {
              var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
              return result * sortOrder;
         }
      }

     //Sorting userlist in Alphabetic order
      $scope.afterData=function(){
          //$scope.users=$scope.users.sort(dynamicSort("name"));
          var users = $scope.users;
          var log = [];
          $scope.alphabet = iterateAlphabet();
          var c = $scope.alphabet.length + 1;
          var item = 'All';
          $scope.alphabet.splice(0, 0, item);
          //Sort user list by first letter of name
          var tmp={};
          for(i=0;i<users.length;i++){
            
            var letter=users[i].name.toUpperCase().charAt(0);
            //console.log(letter);
            if( tmp[ letter] ==undefined){
              tmp[ letter]=[]
            }

              tmp[ letter].push( users[i] );
          }
          $rootScope.letter=tmp;

          $ionicLoading.hide();
          $scope.sorted_users = tmp;

          
      }
       

      $scope.gettestHistory=function(data){
          
          LISTTESTHISTORY.testlisthistory(data).success(function(data){
                if(data.code==200){
                  $scope.user=data.responseData;
                  console.log("f"+$scope.user);
                  if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                    console.log("its done");
                    $scope.moreDataCanBeLoaded=false;
                  }else{
                    $scope.moreDataCanBeLoaded=true;
                  }
                  $scope.shownothing=false;
                  angular.forEach(data.responseData, function(resdata){
                     $scope.users.push(resdata);
                  });
                  if($scope.users==[]||$scope.users==""){
                     $scope.nothingtoshow=true;
                   }else{
                     $scope.nothingtoshow=false;
                   }
                  $ionicLoading.hide();
                  $scope.afterData();
                }else if(data.code==403){
                    $scope.moreDataCanBeLoaded=true;
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                           $ionicLoading.hide();
                          $state.go('home'); 
                        }
                    }]
                  });
                }else{
                  $ionicLoading.hide();
                  var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:data.message ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.testlist");
                              return false;
                           }
                       }]
                    });
                }
            }).error(function(err){
               $ionicLoading.hide();
                console.log(err);
                var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template: SERVER_ERROR,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.testlist");
                              return false;
                           }
                       }]
                    });
            });
      }


      $scope.gettestHistoryAlphabeticScroll=function(data){
        $scope.users=[];
        $ionicLoading.show({
            template: 'Loading...',
          })
        LISTTESTHISTORY.testlisthistory(data).success(function(data){
                console.log(data);
                if(data.code==200){
                  $scope.user=data.responseData;
                  console.log("f"+$scope.user);
                  if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                    console.log("its done");
                    $scope.moreDataCanBeLoaded=false;
                  }else{
                    $scope.moreDataCanBeLoaded=true;
                  }
                  $scope.shownothing=false;
                  angular.forEach(data.responseData, function(resdata){
                     $scope.users.push(resdata);
                  });
                  if($scope.users==[]||$scope.users==""){
                     $scope.nothingtoshow=true;
                   }else{
                     $scope.nothingtoshow=false;
                   }
                  $ionicLoading.hide();
                  $scope.afterData();
                }else if(data.code==403){
                     $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                           $ionicLoading.hide();
                          $state.go('home'); 
                        }
                    }]
                  });
                }else{
                  var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:data.message ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.testlist");
                              return false;
                           }
                       }]
                    });
                }
            }).error(function(err){
                console.log(err);
                var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template: SERVER_ERROR,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.testlist");
                              return false;
                           }
                       }]
                    });
            });
      }

      $scope.gettestHistoryFilter=function(data){
        
        LISTTESTHISTORY.testlisthistory(data).success(function(data){
              console.log(data.responseData);
              $ionicLoading.hide();
              if(data.code==200){
                $scope.users=data.responseData;
                if(data.responseData==[]||data.responseData==null||data.responseData==undefined||data.responseData==""){
                  $scope.nothingtoshow=true;
                }else{
                  $scope.nothingtoshow=false;
                }
                $scope.afterData();
              }else if(data.code==403){
                   $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                  title: 'Error!',
                  template: data.message,
                  buttons: [{
                      text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                         $ionicLoading.hide();
                        $state.go('home'); 
                      }
                  }]
                });
              }else{
                var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template:data.message ,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {

                            $state.go("app.testlist");
                            return false;
                         }
                     }]
                  });
              }
          }).error(function(err){
            $ionicLoading.hide();
              console.log(err);
              var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template: SERVER_ERROR,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $state.go("app.testlist");
                            return false;
                         }
                     }]
                  });
          });
      }


      //Load Test History
      $scope.users=[];
      $scope.loadtesthistory=function(){
          console.log("loadtesthistory");
          $ionicLoading.show({
            template: 'Loading...',
          })
          console.log(JSON.parse(localStorage.getItem("userData")));
          var userData=JSON.parse(localStorage.getItem("userData"));
          console.log(userData._id);
          $scope.userid=userData._id;
          $scope.pageno=0;
          var data={"user_id":$scope.userid,"page_no":$scope.pageno,"limit": 10,"searchBy":$scope.char_to_search };
          console.log(data);
          $scope.gettestHistory(data);
       }

      //Self calling function for Test History listing
      $ionicLoading.show();
      $scope.loadtesthistory();


      //Load more function for paginated data
       $scope.loadMore = function() {
            $ionicLoading.show({
              template: 'Loading...',
             })
             console.log("loadmore");
             $scope.pageno=$scope.pageno+1;
             var data={"user_id":$scope.userid,"page_no":$scope.pageno,"limit": 10,"searchBy":$scope.char_to_search };
            $scope.gettestHistory(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };


        
      //Click letter event
      $scope.gotoList1 = function(letter){
          $ionicLoading.show({
            template: 'Loading...',
          })
          $scope.showtabs=true;
          $scope.char_to_search=letter.toLowerCase();
          $scope.pageno=0;
          var data={"user_id":$scope.userid,"page_no":$scope.pageno,"limit": 10,"searchBy":$scope.char_to_search };
          $scope.gettestHistoryAlphabeticScroll(data);
      }

      $scope.addexistingusertest=function(test){
         $rootScope.existingtest=test;
         $state.go('updatecontactlast');
      } 


      //Delete Existing dCheck
      $scope.deleteexistingtest=function(test){
          console.log(test);
          var confirmPopup = $ionicPopup.confirm({
               title: 'Delete dCheck!',
               template: 'Are you sure you want to delete this dCheck?'
             });

            confirmPopup.then(function(res) {
               $ionicLoading.show();
               if(res) {
                 console.log('You are sure');
                 console.log(test);
                 var datajson={"producttestusers_id":test._id}
                CREATETEST.deleteusertestexisting(datajson).success(function(data){
                  console.log(data);
                  $ionicLoading.hide();
                  if(data.code==200){
                    var alertPopup = $ionicPopup.alert({
                      title: 'Success!',
                      template: 'dCheck deleted successfully!'
                     });

                    alertPopup.then(function(res) {
                        console.log('Thank you for sharing dCheck!');
                        $state.go($state.current, {}, {reload: true});
                    });
                  }else if(data.code==403){
                         $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: data.message,
                        buttons: [{
                            text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                               $ionicLoading.hide();
                              $state.go('home'); 
                            }
                        }]
                      });
                    }else{
                       $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: data.message,
                        buttons: [{
                            text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                               $ionicLoading.hide();
                              $state.go('home'); 
                            }
                        }]
                      });
                    }
              
                }).error(function(err){
                      console.log(err);
                      var alertPopup = 
                      $ionicPopup.alert({
                      title: 'Error!',
                      template:data.message ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go($state.current, {}, {reload: true});
                              return false;
                           }
                       }]
                    });
                });
               
               }else{
                  console.log('You are not sure');
                 $state.go($state.current, {}, {reload: true});
                 return true;
               }
           });
       }

        

       $scope.getuserHistory=function(test){
          console.log(test);
          $rootScope.producttestusers=test;
          $state.go("testhistory");
       }

       

 })

//TestResult History controller
.controller('testhistoryCtrl', function($scope, $stateParams,$rootScope,$ionicModal,$state,$timeout,$ionicLoading,$ionicPopup,LISTTESTHISTORY,$cordovaFileOpener2,$cordovaFileTransfer, $cordovaFile,$cordovaToast) {
          var isIOS = ionic.Platform.isIOS();
          var isAndroid = ionic.Platform.isAndroid();
          $scope.userName=$rootScope.producttestusers.name;
          $scope.pageno=0;
          $scope.testResultsHistory=[];
          $scope.getUserTestHistory=function(datajson){
              $ionicLoading.show({
                template: 'Loading...',
              })
              console.log(datajson);
              LISTTESTHISTORY.getusertestjistorypdf(datajson).success(function(data){
                $ionicLoading.hide();
                if(data.code==200){
                  console.log(data.responseData);
                  $scope.testdatatoList=data.responseData;
                  if(data.responseData==[]||data.responseData==""||data.responseData==undefined||data.responseData==null){
                    $scope.moreDataCanBeLoaded=false;
                  }else{
                     $scope.moreDataCanBeLoaded=true;
                 }
                 angular.forEach(data.responseData, function(resdata){
                       var filename = resdata.pdfPath.split("/").pop(); 
                       resdata.pdfname=filename;
                       $scope.testResultsHistory.push(resdata);
                });
                  
                }else if(data.code==403){
                     $ionicLoading.hide();
                     $scope.moreDataCanBeLoaded=false;
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                           $ionicLoading.hide();
                          $state.go('home'); 
                        }
                    }]
                  });
                }else{
                    var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:data.message ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {

                              $state.go("app.testlist");
                              return false;
                           }
                       }]
                    });
                 }
              }).error(function(err){
                  $ionicLoading.hide();
                  console.log(err);
                var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template: SERVER_ERROR,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.testlist");
                              return false;
                           }
                       }]
                    });
              });
          }

          //Load Test Results
          $scope.loadTestResults=function(){
            var datajson={"producttestusers_id":$rootScope.producttestusers._id,"page_no": $scope.pageno,"limit": 10}
            $scope.getUserTestHistory(datajson);
          }
          $scope.loadTestResults();
          


          //Load more function for paginated data
           $scope.loadMore = function() {
               $ionicLoading.show({
                  template: 'Loading...',
                })
                if($rootScope.stopnow=="true"){
                  $ionicLoading.hide();
                  return true;
                }
                 console.log("loadmore");
                 $scope.pageno=$scope.pageno+1;
                 var datajson={"producttestusers_id":$rootScope.producttestusers._id,"page_no": $scope.pageno,"limit": 10}

                $scope.getUserTestHistory(datajson);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

            /*$scope.$on('$stateChangeSuccess', function() {
              $scope.loadMore();
            });*/

            //Download and open dCheck
            $scope.downloaddCheck=function(url){
                $ionicLoading.show({
                      template: 'Downloading...'
                  });
                //var url = "https://www.languages.dk/archive/pools-m/manuals/final/taskuk.pdf";    
                // File name only     
                 var filename = url.split("/").pop(); 
                  console.log(cordova.file.dataDirectory);
                  var targetPath ;
                  if(isIOS){
                    console.log("its ios");
                    targetPath =cordova.file.dataDirectory + "/dCheck/" + filename; 
                  }else{
                    console.log("its android");
                    //targetPath= cordova.file.externalRootDirectory + "/dCheck/" + filename;
                    targetPath =cordova.file.externalDataDirectory + "/dCheck/" + filename; 
                  }
                  
                  // var targetPath =cordova.file.dataDirectory + "/dCheck/" + filename;      
                  var trustHosts = true;
                  var options = {};

                  $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                    .then(function(result) {
                      console.log("result");
                      console.log(result);
                      if(!isIOS){
                            $cordovaFileOpener2.appIsInstalled('com.adobe.reader').then(function(res) {
                                if (res.status === 0) {
                                    // Adobe Reader is not installed.
                                   // alert("installed");
                                    $cordovaFileOpener2.open(
                                    result.nativeURL,
                                    'application/pdf'
                                    ).then(function() {
                                          $ionicLoading.hide();
                                          $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                                          $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                            //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                          }, function (error) {
                                         });
                                    
                                      }, function(e) {
                                         $ionicLoading.hide();
                                          console.log("ERROR");
                                          console.log(JSON.stringify(e));
                                          $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                                          $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                            //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                          }, function (error) {
                                         });
                                          
                                  });
                                } else {
                                    // Adobe Reader is installed.
                                    ///alert(" not installed");
                                    $ionicLoading.hide();
                                    var alertPopup = 
                                       $ionicPopup.alert({
                                        title: 'Error!',
                                        template:"No suitable app found to open PDF file!" ,
                                        buttons: [{
                                        text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                            $state.go("app.testlist");
                                            return false;
                                         }}]
                                      });
                                  }
                                })
                        }else{
                           $cordovaFileOpener2.open(
                            result.nativeURL,
                            'application/pdf'
                            ).then(function() {
                                  $ionicLoading.hide();
                                  $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                                  $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                    //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                  }, function (error) {
                                 });
                            
                              }, function(e) {
                                 $ionicLoading.hide();
                                  console.log("ERROR");
                                  console.log(JSON.stringify(e));
                                  $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                                  $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                    //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                  }, function (error) {
                                 });
                                  
                          });

                        }  
                      
                    }, function(err) {
                          console.log(err);
                          $ionicLoading.hide();
                          $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                          $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                            //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                          }, function (error) {
                         });
                      // Error
                    }, function (progress) {
                      var downloadProgress = (progress.loaded / progress.total) * 100;
                      $ionicLoading.show({
                          template: "Downloaded：" + Math.floor(downloadProgress) + "%"
                      });
                      if (downloadProgress >= 100) {
                          $ionicLoading.hide();
                      }
                  });
                       
          }

          $scope.downloadpdf=function(url){
            console.log(url);
            $scope.pdfurl=url;
            var confirmPopup = $ionicPopup.confirm({
                 title: 'Download dCheck!',
                 template: 'Are you sure you want to download this dCheck?'
            });

           confirmPopup.then(function(res) {
             if(res) {
              console.log($scope.pdfurl);
               $scope.downloaddCheck($scope.pdfurl);
               console.log('You are sure');
             } else {
               console.log('You are not sure');
               $state.go($state.current, {}, {reload: true});
             }
           });
            //$scope.downloaddCheck(url);
          }
 })


//GroupList controller for Normal group listing
.controller('grouplistCtrl', function($scope, $stateParams,$rootScope,$ionicModal,$state,$timeout,$ionicLoading,GROUPSSERVICE,STAFFSERVICE,$ionicPopup) {
        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;
        $scope.groups = [];
        $scope.pageno=0;
        $scope.moreDataCanBeLoadedsearch=false;
       $scope.moreDataCanBeLoaded=true;
       $scope.nothingtoshow=false; 

        $scope.getGroupList=function  (data) {
            console.log(data);
            GROUPSSERVICE.groupslisting(data).success(function(data){
                  $ionicLoading.hide();
                  console.log(data);
                  if(data.code==200){
                    console.log(data.groupListing);
                    $scope.testdatatoList=data.groupListing;
                    if(data.groupListing==[]||data.groupListing==""||data.groupListing==undefined||data.groupListing==null){
                      $scope.moreDataCanBeLoaded=false;
                     
                    }/*else{
                       $scope.moreDataCanBeLoaded=true;
                       
                   }*/
                   angular.forEach(data.groupListing, function(resdata){
                         $scope.groups.push(resdata);
                  });
                   if($scope.groups==[]||$scope.groups==""||$scope.groups==undefined||$scope.groups==null){
                     $scope.nothingtoshow=true;
                   }else{
                    $scope.nothingtoshow=false;
                   }
                }else if(data.code==403){
                    $ionicLoading.hide();
                    $scope.moreDataCanBeLoaded=false;
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                           $ionicLoading.hide();
                          $state.go('home'); 
                        }
                    }]
                  });
                }else{
                   var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:response.message ,
                      buttons: [{
                      text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                          $state.go("app.testlist");
                          return false;
                       }}]
                    });
                }
            }).error(function(err){
              $ionicLoading.hide();
              console.log(err);
                var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:SERVER_ERROR ,
                      buttons: [{
                      text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                          $state.go("app.testlist", {}, { reload: 'app.testlist' });
                          return false;
                       }}]
                  });
            });
        }

        $scope.getGroupListfilter=function  (data) {
          console.log(data);

            GROUPSSERVICE.groupslisting(data).success(function(data){
                  $ionicLoading.hide();
                  console.log(data);
                  if(data.code==200){
                    console.log(data.groupListing);
                    $scope.testdatatoList=data.groupListing;
                    if(data.groupListing==[]||data.groupListing==""||data.groupListing==undefined||data.groupListing==null){
                      $scope.moreDataCanBeLoaded=false;
                     
                    }/*else{
                       $scope.moreDataCanBeLoaded=true;
                       
                   }*/
                   $scope.groups = [];
                   angular.forEach(data.groupListing, function(resdata){
                         $scope.groups.push(resdata);
                  });
                   if($scope.groups==[]||$scope.groups==""||$scope.groups==undefined||$scope.groups==null){
                     $scope.nothingtoshow=true;
                   }else{
                    $scope.nothingtoshow=false;
                   }
                }else if(data.code==403){
                    $ionicLoading.hide();
                    $scope.moreDataCanBeLoaded=false;
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                           $ionicLoading.hide();
                          $state.go('home'); 
                        }
                    }]
                  });
                }else{
                   var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:response.message ,
                      buttons: [{
                      text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                          $state.go("app.testlist");
                          return false;
                       }}]
                    });
                }
            }).error(function(err){
              $ionicLoading.hide();
              console.log(err);
                var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:SERVER_ERROR ,
                      buttons: [{
                      text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                          $state.go("app.testlist", {}, { reload: 'app.testlist' });
                          return false;
                       }}]
                  });
            });
        }

        $scope.loadGroups1=function(){
          $ionicLoading.show({
            template: 'Loading...',
          })
          $scope.pageno=0;
          var userData=JSON.parse(localStorage.getItem("userData"));
          var userid=userData._id;
          var data={"user_id":userid,"page_no":$scope.pageno,"limit":10};
          $scope.getGroupList(data);
        }
       $scope.loadGroups1(); 


          //Load more function for paginated data
         $scope.loadMore = function() {
            $ionicLoading.show({
            template: 'Loading...',
          })
            console.log("loadmore")
            $scope.pageno=$scope.pageno+1;
            var userData=JSON.parse(localStorage.getItem("userData"));
            var userid=userData._id;
            var data={"user_id":userid,"page_no":$scope.pageno,"limit":10};
            $scope.getGroupList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
          };
          /*$scope.$on('$stateChangeSuccess', function() {
            $scope.loadMore();
          });*/


        /*  //Load more function for paginated data
         $scope.loadMoresearch = function() {
            $ionicLoading.show();
            console.log("loadmore")
            $scope.pageno=$scope.pageno+1;
            var userData=JSON.parse(localStorage.getItem("userData"));
            var userid=userData._id;
            var data={"user_id":userid,"page_no":$scope.pageno,"limit":10,"nameSearch":$rootScope.searchgroupletter};
            $scope.getGroupList(data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
          };*/

         
           



        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
        });
        
        $scope.shownow=function(ngModel){

          console.log(ngModel.show);
          if(ngModel.show==true){
             $scope.moreDataCanBeLoaded=false;
             $timeout(function () {          
                document.getElementById('groupsearchtxt').select();
                cordova.plugins.Keyboard.show();     
               }, 0);
           // $scope.moreDataCanBeLoadedsearch=true;
            //$scope.moreDataCanBeLoaded=false;
          }else{
            //$scope.moreDataCanBeLoadedsearch=false;
            //$scope.moreDataCanBeLoaded=true;
            $scope.moreDataCanBeLoaded=true;
            $state.go($state.current, {}, {reload: true});
          }
        } 


        $scope.show = function() {
          $ionicLoading.show({
            template: 'Loading...',
            duration: 3000
          }).then(function(){
             console.log("The loading indicator is now displayed");
          });
        };
        $scope.hide = function(){
          $ionicLoading.hide().then(function(){
             console.log("The loading indicator is now hidden");
          });
         };

        $scope.getEmployee=function  (group) {
          $ionicLoading.show();
          console.log("group");
          $rootScope.groupUsers=group;
          console.log($rootScope.groupUsers);
          $state.go("stafflistchecked", {}, { reload: 'app.testlist' });
        }

        $scope.serachbygroupname=function(char){
          $scope.groups = [];
          $ionicLoading.show({
            template: 'Loading...',
          })
          $rootScope.searchgroupletter=char;
          console.log(char);
          $scope.pageno=0;
          var userData=JSON.parse(localStorage.getItem("userData"));
          var userid=userData._id;
          var data={"user_id":userid,"page_no":$scope.pageno,"limit":500,"nameSearch":char};
          $scope.getGroupListfilter(data);
        }



        //Create Group Modal popup
        $ionicModal.fromTemplateUrl('templates/modal.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

        //Create new Group
        $scope.createGroup1=function(group){
          
            if(group==undefined || group==""||group==null){
                 $ionicPopup.alert({
                      title: 'Required!',
                      template:'Group Name and description is Required!' ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                               return false;
                           }
                       }]
                    });
            }else{
                if(group.groupName=="" || group.groupName==undefined ||group.groupName==null){
                  $ionicPopup.alert({
                      title: 'Required!',
                      template:'Group Name is Required!' ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                               return false;
                           }
                       }]
                    });
                }else{
                      if(group.groupdesc=="" || group.groupdesc==undefined ||group.groupdesc==null){
                          $ionicPopup.alert({
                          title: 'Required!',
                          template:'Group description is Required!' ,
                          buttons: [{
                              text: 'Ok' ,
                              type: 'button-assertive',
                              onTap: function(e) {
                                   return false;
                               }
                       }]
                    });
                      }else{
                         $rootScope.groupInfo=group;
                         console.log($rootScope.groupInfo);
                         $state.go("stafflistforgrplist", {}, { reload: 'stafflistforgrplist' });
                         $scope.modal.hide();
                         //return $scope.data;

                      }
                  }
             }
        }

        //Delete Group from list
        $scope.deleteGroup=function (id) {
          $scope.groupid=id;
          var confirmPopup = $ionicPopup.confirm({
             title: 'Delete Group!',
             template: 'Are you sure you want to delete this group?'
           });

          confirmPopup.then(function(res) {
             $ionicLoading.show({
               template: 'Loading...',
             })
             if(res) {
               console.log('You are sure');
               var datajson={
                   group_id:$scope.groupid
                }
                GROUPSSERVICE.deletegroup(datajson).success(function(data){
                    $ionicLoading.hide();
                    console.log(data);
                     if(data.code==200){
                        var alertPopup = $ionicPopup.alert({
                          title: 'Success!',
                          template: 'Group deleted successfully!'
                         });

                        alertPopup.then(function(res) {
                            console.log('Thank you for sharing dCheck!');
                            $state.go($state.current, {}, {reload: true});
                        });
                      
                  }else if(data.code==403){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                           $ionicLoading.hide();
                          $state.go('home'); 
                        }
                    }]
                  });
                }else{
                     var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:data.message ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go($state.current, {}, {reload: true});
                              return false;
                           }
                       }]
                    });
                  }
                }).error(function(err){
                    console.log(err);
                });
             } else {
               console.log('You are not sure');
               $state.go($state.current, {}, {reload: true});
               return true;
             }
          });
        }

        $scope.checkuser=function(){
            $ionicLoading.show();
            STAFFSERVICE.staffnotingroup().success(function(data){
                  console.log(data.responseData);
                  if(data.code==200){
                    $scope.user=data.responseData;
                    if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                          $ionicLoading.hide();
                          console.log("its done");
                          var alertPopup = $ionicPopup.alert({
                             title: 'Attention!',
                             template: 'No staff available to create a new group.'
                           });

                           alertPopup.then(function(res) {
                             $state.go($state.current, {}, {reload: true});
                           });
                         
                      }else{
                         $ionicLoading.hide();
                         $scope.modal.show();
                      }
                  }else if(data.code==403){
                      $ionicLoading.hide();
                      var alertPopup = $ionicPopup.alert({
                      title: 'Error!',
                      template: data.message,
                      buttons: [{
                          text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $ionicLoading.hide();
                            $state.go('home'); 
                          }
                      }]
                    });
                  }else{
                    $ionicLoading.hide();
                    var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template:data.message ,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                $state.go("app.testlist",{}, {reload: true});
                                return false;
                             }
                         }]
                      });
                  }
              }).error(function(err){
                  console.log(err);
                  var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template: SERVER_ERROR,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                $state.go("app.testlist",{}, {reload: true});
                                return false;
                             }
                         }]
                      });
              });
        }



        //Edit existing Group
        $scope.editExistingGroup=function(group){
          console.log(group);
          $rootScope.groupIdToEditStaff=group._id;
          $state.go("groupStafflist");
        }

        //Get Test History Group
        $scope.getGroupTestHistory=function(group){
            console.log(group._id);
            $rootScope.groupidForgettesthistory=group._id;
            console.log($rootScope.groupidForgettesthistory);

            $state.go("grouphistory");
        }
 })

 //GroupList controller for Test Result History
.controller('grouphistoryCtrl', function($scope, $stateParams,$rootScope,$ionicModal,$state,$timeout,$ionicLoading,$ionicPopup,LISTTESTHISTORY,GROUPSSERVICE,$cordovaFileOpener2,$cordovaFileTransfer, $cordovaFile,$cordovaToast) {
          console.log($rootScope.groupidForgettesthistory);
          var isIOS = ionic.Platform.isIOS();
          var isAndroid = ionic.Platform.isAndroid();
          $scope.pageno=0;
          $scope.testResultsHistory=[];
          $scope.getUserTestHistory=function(datajson){
              $ionicLoading.show({
                template: 'Loading...',
              })
              console.log(datajson);
              GROUPSSERVICE.getgrouptestresulthistory(datajson).success(function(data){
                  $ionicLoading.hide();
                  if(data.code==200){
                      console.log(data.responseData);
                      $scope.testdatatoList=data.responseData;
                      if(data.responseData==[]||data.responseData==""||data.responseData==undefined||data.responseData==null){
                        $scope.moreDataCanBeLoaded=false;
                      }else{
                         $scope.moreDataCanBeLoaded=true;
                   }
                   angular.forEach(data.responseData, function(resdata){
                         var filename = resdata.pdfFiles.split("/").pop(); 
                         console.log(filename);
                         resdata.pdfname=filename;
                         $scope.testResultsHistory.push(resdata);
                   });
                }else if(data.code==403){
                     $ionicLoading.hide();
                     $scope.moreDataCanBeLoaded=false;
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                           $ionicLoading.hide();
                          $state.go('home'); 
                        }
                    }]
                  });
                }else{
                      $ionicLoading.hide();
                      $scope.moreDataCanBeLoaded=false;
                      var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:data.message ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.grouplist");
                              return false;
                           }
                       }]
                    });
                }
              }).error(function(err){
                $scope.moreDataCanBeLoaded=false;
                  $ionicLoading.hide();
                  console.log(err);
                var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template: SERVER_ERROR,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.grouplist");
                              return false;
                           }
                       }]
                    });
              });
          }

          //Load Test Results
          $scope.loadTestResults=function(){
            var datajson={"group_id":$rootScope.groupidForgettesthistory,"page_no": $scope.pageno,"limit": 10}
            $scope.getUserTestHistory(datajson);
          }
          $scope.loadTestResults();
          


          //Load more function for paginated data
           $scope.loadMore = function() {
                $ionicLoading.show({
                    template: 'Loading...',
                  })
                if($rootScope.stopnow=="true"){
                  $ionicLoading.hide();
                  return true;
                }
                 console.log("loadmore");
                 $scope.pageno=$scope.pageno+1;
                 var datajson={"group_id":$rootScope.groupidForgettesthistory,"page_no": $scope.pageno,"limit": 10}

                $scope.getUserTestHistory(datajson);
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };

            /*$scope.$on('$stateChangeSuccess', function() {
              $scope.loadMore();
            });*/

            //Download and open dCheck
            $scope.downloaddCheck=function(url){
                 $ionicLoading.show({
                      template: 'Downloading...'
                  });
                //var url = "https://www.languages.dk/archive/pools-m/manuals/final/taskuk.pdf";    
                // File name only     
                 var filename = url.split("/").pop(); 
                  console.log(cordova.file.dataDirectory);
                  var targetPath ;
                  if(isIOS){
                    console.log("its ios");
                    targetPath =cordova.file.dataDirectory + "/dCheck/" + filename; 
                  }else{
                    console.log("its android");
                    targetPath= cordova.file.externalDataDirectory + "/dCheck/" + filename;
                    //targetPath =cordova.file.dataDirectory + "/dCheck/" + filename; 
                  }
                  
                  // var targetPath =cordova.file.dataDirectory + "/dCheck/" + filename;      
                  var trustHosts = true;
                  var options = {};

                  $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                    .then(function(result) {
                      console.log(result);
                      if(!isIOS){
                            $cordovaFileOpener2.appIsInstalled('com.adobe.reader').then(function(res) {
                                if (res.status === 0) {
                                    // Adobe Reader is not installed.
                                   // alert("installed");
                                    $cordovaFileOpener2.open(
                                    result.nativeURL,
                                    'application/pdf'
                                    ).then(function() {
                                          $ionicLoading.hide();
                                          $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                                          $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                            //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                          }, function (error) {
                                         });
                                    
                                      }, function(e) {
                                         $ionicLoading.hide();
                                          console.log("ERROR");
                                          console.log(JSON.stringify(e));
                                          $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                                          $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                            //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                          }, function (error) {
                                         });
                                          
                                  });
                                } else {
                                    // Adobe Reader is installed.
                                    ///alert(" not installed");
                                    var alertPopup = 
                                       $ionicPopup.alert({
                                        title: 'Error!',
                                        template:"No suitable app found to open PDF file!" ,
                                        buttons: [{
                                        text: 'Ok' ,
                                        type: 'button-assertive',
                                        onTap: function(e) {
                                            $state.go("app.testlist");
                                            return false;
                                         }}]
                                      });
                                  }
                                })
                        }else{
                           $cordovaFileOpener2.open(
                            result.nativeURL,
                            'application/pdf'
                            ).then(function() {
                                  $ionicLoading.hide();
                                  $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                                  $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                    //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                  }, function (error) {
                                 });
                            
                              }, function(e) {
                                 $ionicLoading.hide();
                                  console.log("ERROR");
                                  console.log(JSON.stringify(e));
                                  $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                                  $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                    //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                  }, function (error) {
                                 });
                                  
                          });

                        }  
                      
                    }, function(err) {
                          console.log(err);
                          $ionicLoading.hide();
                          $state.go($state.current, {}, {reload: true}); //second parameter is for $stateParams
                          $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                            //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                          }, function (error) {
                         });
                      // Error
                    }, function (progress) {
                      var downloadProgress = (progress.loaded / progress.total) * 100;
                      $ionicLoading.show({
                          template: "Downloaded：" + Math.floor(downloadProgress) + "%"
                      });
                      if (downloadProgress >= 100) {
                          $ionicLoading.hide();
                      }
                  });
                       
          }

          $scope.downloadpdf=function(url){
            console.log(url);
            $scope.pdfurl=url;
            var confirmPopup = $ionicPopup.confirm({
                 title: 'Download dCheck!',
                 template: 'Are you sure you want to download this dCheck?'
            });

           confirmPopup.then(function(res) {
             if(res) {
              console.log($scope.pdfurl);
               $scope.downloaddCheck($scope.pdfurl);
               console.log('You are sure');
             } else {
               console.log('You are not sure');
               $state.go($state.current, {}, {reload: true});
             }
           });
            //$scope.downloaddCheck(url);
          }
 })

//Group Details Controller to Create new group while dCheck scan process
.controller('grouplistcheckedCtrl', function($scope, $ionicPopup,$state,$ionicModal, $timeout,$state,$ionicLoading,$ionicPopup,GROUPSSERVICE,LISTTESTHISTORY,$rootScope,$cordovaFileOpener2,$cordovaFileTransfer, $cordovaFile,$cordovaToast,STAFFSERVICE) {
  var isIOS = ionic.Platform.isIOS();
  var isAndroid = ionic.Platform.isAndroid();
  $scope.moreDataCanBeLoaded=true;
  $scope.nothingtoshow=false; 
  $scope.groupsforShare=[];
  $scope.pageno=0;

  $scope.getGroupList=function  (data) {
      $ionicLoading.show({
        template: 'Loading groups to share results...',
      })
      
      GROUPSSERVICE.groupslisting(data).success(function(response){
          $ionicLoading.hide();
          console.log(response);
          if(response.code==200){
            if(response.groupListing==[]||response.groupListing==""||response.groupListing==undefined||response.groupListing==null){
                  $scope.moreDataCanBeLoaded=false;
                }
               angular.forEach(response.groupListing, function(resdata){
                    $scope.groupsforShare.push(resdata);
              });
               if($scope.groupsforShare==[]||$scope.groupsforShare==""||$scope.groupsforShare==undefined||$scope.groupsforShare==null){
                 $scope.nothingtoshow=true;
               }else{
                $scope.nothingtoshow=false;
               }
            //$scope.groupsforShare=response.groupListing;
          }else if(data.code==403){
              $ionicLoading.hide();
              $scope.moreDataCanBeLoaded=false;
              var alertPopup = $ionicPopup.alert({
              title: 'Error!',
              template: data.message,
              buttons: [{
                  text: 'Ok' ,
                type: 'button-assertive',
                onTap: function(e) {
                     $ionicLoading.hide();
                    $state.go('home'); 
                  }
              }]
            });
          }else{
             var alertPopup = 
               $ionicPopup.alert({
                title: 'Error!',
                template:response.message ,
                buttons: [{
                    text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                        $state.go("app.testlist", {}, { reload: 'app.testlist' });
                        return false;
                     }
                 }]
              });
          }
      }).error(function(err){
        $ionicLoading.hide();
        console.log(err);
          var alertPopup = 
               $ionicPopup.alert({
                title: 'Error!',
                template:SERVER_ERROR ,
                buttons: [{
                    text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                        $state.go("app.testlist", {}, { reload: 'app.testlist' });
                        return false;
                     }
                 }]
              });
      });
  }

    $scope.loadgroupchecked=function(){
        console.log(JSON.parse(localStorage.getItem("userData")));
        var userData=JSON.parse(localStorage.getItem("userData"));
        var userid=userData._id;
        var data={"user_id":userid,  "page_no": $scope.pageno, "limit": 10};
        $scope.getGroupList(data);                     //Group Listing
    }

    $scope.loadgroupchecked();


     //Load more function for paginated data
     $scope.loadMore = function() {
        $ionicLoading.show({
            template: 'Loading...',
          })
        console.log("loadmore")
        $scope.pageno=$scope.pageno+1;
        var userData=JSON.parse(localStorage.getItem("userData"));
        var userid=userData._id;
        var data={"user_id":userid,  "page_no": $scope.pageno, "limit": 10};
        $scope.getGroupList(data);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      };

    $scope.myGoBack = function() {
      console.log("dsdf");
          var confirmPopup = $ionicPopup.confirm({
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
    };


  //Download and open dCheck
  $scope.downloaddCheck=function(url){
       $ionicLoading.show({
            template: 'Downloading...'
        });
      //var url = "https://www.languages.dk/archive/pools-m/manuals/final/taskuk.pdf";    
      // File name only     
       var filename = url.split("/").pop(); 
        console.log(cordova.file.dataDirectory);
        var targetPath ;
        if(isIOS){
          console.log("its ios");
          targetPath =cordova.file.dataDirectory + "/dCheck/" + filename; 
        }else{
          console.log("its android");
          targetPath= cordova.file.externalDataDirectory + "/dCheck/" + filename;
          //targetPath =cordova.file.dataDirectory + "/dCheck/" + filename; 
        }
        
        // var targetPath =cordova.file.dataDirectory + "/dCheck/" + filename;      
        var trustHosts = true;
        var options = {};

        $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
          .then(function(result) {
            console.log(result);
            if(!isIOS){
                  $cordovaFileOpener2.appIsInstalled('com.adobe.reader').then(function(res) {
                      if (res.status === 0) {
                          // Adobe Reader is not installed.
                         // alert("installed");
                          $cordovaFileOpener2.open(
                          result.nativeURL,
                          'application/pdf'
                          ).then(function() {
                                $ionicLoading.hide();
                                $state.go("app.testlist", {}, {reload: true}); //second parameter is for $stateParams
                                $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                  //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                }, function (error) {
                               });
                          
                            }, function(e) {
                               $ionicLoading.hide();
                                console.log("ERROR");
                                console.log(JSON.stringify(e));
                                $state.go("app.testlist", {}, {reload: true}); //second parameter is for $stateParams
                                $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                                  //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                                }, function (error) {
                               });
                                
                        });
                      } else {
                          // Adobe Reader is installed.
                          ///alert(" not installed");
                          var alertPopup = 
                             $ionicPopup.alert({
                              title: 'Error!',
                              template:"No suitable app found to open PDF file!" ,
                              buttons: [{
                              text: 'Ok' ,
                              type: 'button-assertive',
                              onTap: function(e) {
                                  $state.go("app.testlist");
                                  return false;
                               }}]
                            });
                        }
                      })
              }else{
                 $cordovaFileOpener2.open(
                  result.nativeURL,
                  'application/pdf'
                  ).then(function() {
                        $ionicLoading.hide();
                        $state.go("app.testlist", {}, {reload: true}); //second parameter is for $stateParams
                        $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                          //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                        }, function (error) {
                       });
                  
                    }, function(e) {
                       $ionicLoading.hide();
                        console.log("ERROR");
                        console.log(JSON.stringify(e));
                        $state.go("app.testlist", {}, {reload: true}); //second parameter is for $stateParams
                        $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                          //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                        }, function (error) {
                       });
                        
                });

              }  
            
          }, function(err) {
                console.log(err);
                $ionicLoading.hide();
                $state.go("app.testlist", {}, {reload: true}); //second parameter is for $stateParams
                $cordovaToast.showLongBottom('PDF downloaded Successfully').then(function(success) {
                  //$state.go("app.testlist", {}, { reload: 'app.testlist' });
                }, function (error) {
               });
            // Error
          }, function (progress) {
            var downloadProgress = (progress.loaded / progress.total) * 100;
            $ionicLoading.show({
                template: "Downloaded：" + Math.floor(downloadProgress) + "%"
            });
            if (downloadProgress >= 100) {
                $ionicLoading.hide();
            }
        });
     }


    //showpopup method code
    $scope.showPopup = function() {
       $scope.data = {}

       var myPopup = $ionicPopup.show({

          template: 'Group Name <input type="text" ng-model="data.groupName" placeholder="Enter Group Name" class="group_txt">   <br> Group Discription  <textarea name="comment" ng-model="data.groupdesc" class="group_area"></textarea> ',

          title: 'Create Group',

          subTitle: '',

          scope: $scope,

          buttons: [{

             text: 'Cancel'

          }, {

             text: '<b>Ok</b>',

             type: 'button-positive',

             onTap: function(e) {
                console.log($scope.data);
                if (!$scope.data.groupName && !$scope.data.groupName) {

                   //don't allow the user to close unless he enters wifi password

                   e.preventDefault();

                } else {
                   $rootScope.groupInfo=$scope.data;
                   console.log($rootScope.groupInfo);
                   $state.go("stafflistchecked", {}, { reload: 'stafflistchecked' });
                   //return $scope.data;

                }

             }

          }, ]

       });

       myPopup.then(function(res) {

          if (res) {

             if (res.userPassword == res.confirmPassword) {

                console.log('Password Is Ok');

             } else {

                console.log('Password not matched');

             }

          } else {

             console.log('Enter password');

          }

       });

    };

  // showpopup method code
      $scope.showPopup2 = function() {

         $scope.data = {}

         var myPopup = $ionicPopup.show({

            
            template: 'Share this on!',
            title: 'Share dCheck',

            subTitle: '',

            scope: $scope,

            buttons: [{

               text: '',
               type: 'button-positive cancel_task',
               onTap: function(e) {
                  $ionicLoading.show();
                  console.log("Share by Email");
                  var dataJson={
                    group_id:$scope.sharedgroupId,
                    productTest_ids:[$rootScope.producttest_id],
                    via:"email"
                  }
                  console.log("forsharing");
                  console.log(dataJson);
                  LISTTESTHISTORY.sharedcheckbymail(dataJson).success(function(data){
                      $ionicLoading.hide();
                      console.log(data);
                      if(data.code==200){
                          var alertPopup = $ionicPopup.alert({
                            title: 'Congratulations!',
                            template: 'Your dCheck has been shared successfully by email, please check your email for more details!'
                          });

                          alertPopup.then(function(res) {
                              console.log('Thank you for sharing dCheck!');
                              delete $rootScope.createTest;
                              delete $rootScope.productTest;
                              $state.go("app.testlist",{}, {reload: "app.testlist"});
                          });
                      }else if(data.code==403){
                          $ionicLoading.hide();
                          var alertPopup = $ionicPopup.alert({
                          title: 'Error!',
                          template: data.message,
                          buttons: [{
                              text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                 $ionicLoading.hide();
                                $state.go('home'); 
                              }
                          }]
                        });
                      }else{
                        $ionicLoading.hide();
                          var alertPopup = $ionicPopup.alert({
                          title: 'Error!',
                          template: data.message,
                          buttons: [{
                              text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                 $ionicLoading.hide();
                                $state.go('home'); 
                              }
                          }]
                        });
                      }
                      
                  }).error(function(err){
                      $ionicLoading.hide();
                      console.log(err);
                          var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:"Server not responding, Please try again" ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.testlist",{}, {reload: true});
                              return false;
                           }
                       }]
                    });
                  });
               }

            }, {

               text: '',

               type: 'button-positive pdf_task',

               onTap: function(e) {
                  console.log("Download as PDF");
                  $ionicLoading.show();
                  console.log("Share by PDF download!");
                  var dataJson={
                    group_id:$scope.sharedgroupId,
                    productTest_ids:[$rootScope.producttest_id],
                   
                  }
                  console.log("forsharingNormal");
                  console.log(dataJson);
                  LISTTESTHISTORY.sharedcheckbymail(dataJson).success(function(data){
                      $ionicLoading.hide();
                      if(data.code==200){
                        delete $rootScope.createTest;
                        delete $rootScope.productTest;
                        $scope.downloaddCheck($rootScope.pdfPath);
                      }else if(data.code==403){
                          $ionicLoading.hide();
                          var alertPopup = $ionicPopup.alert({
                          title: 'Error!',
                          template: data.message,
                          buttons: [{
                              text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                 $ionicLoading.hide();
                                $state.go('home'); 
                              }
                          }]
                        });
                      }else{
                        $ionicLoading.hide();
                          var alertPopup = $ionicPopup.alert({
                          title: 'Error!',
                          template: data.message,
                          buttons: [{
                              text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                 $ionicLoading.hide();
                                $state.go('home'); 
                              }
                          }]
                        });
                      }
                      
                  }).error(function(err){
                      $ionicLoading.hide();
                      console.log(err);
                          var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:"Server not responding, Please try again" ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.testlist",{}, {reload: true});
                              return false;
                           }
                       }]
                    });
                  });
                 

               }

            }, ]

         });

         
      };

  $scope.getgroupEmployee=function(group){
        $ionicLoading.hide();
        $rootScope.groupData=group;
        $scope.sharedgroupId=group._id;
        console.log($rootScope.groupData);
        var confirmPopup = $ionicPopup.confirm({
          title: 'Attention!',
          template: "Are you sure you want to share this dCheck to "+group.group_name+" group?"
        });
        confirmPopup.then(function(res)
         {if(res) {
           $scope.showPopup2();
          //$state.go("stafflistchecked");
        } else {
          console.log('You are not sure');
          return true;
        }
      });
       
  }
  

  //Create Group Modal
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });



  $scope.createGroup1=function(group){
      if(group==undefined || group==""||group==null){
           $ionicPopup.alert({
                title: 'Required!',
                template:'Group Name and description is Required!' ,
                buttons: [{
                    text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                         return false;
                     }
                 }]
              });
      }else{
          if(group.groupName=="" || group.groupName==undefined ||group.groupName==null){
            $ionicPopup.alert({
                title: 'Required!',
                template:'Group Name is Required!' ,
                buttons: [{
                    text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                         return false;
                     }
                 }]
              });
          }else{
                if(group.groupdesc=="" || group.groupdesc==undefined ||group.groupdesc==null){
                    $ionicPopup.alert({
                    title: 'Required!',
                    template:'Group description is Required!' ,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                             return false;
                         }
                 }]
              });
                }else{
                   $rootScope.groupInfo=group;
                   console.log($rootScope.groupInfo);
                   $state.go("stafflistchecked", {}, { reload: 'stafflistchecked' });
                   $scope.modal.hide();
                   //return $scope.data;

                }
         }
       }
   }


   $scope.checkuser=function(){
       $ionicLoading.show();
        STAFFSERVICE.staffnotingroup().success(function(data){
              console.log(data.responseData);
              if(data.code==200){
                $scope.user=data.responseData;
                if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                      $ionicLoading.hide();
                      console.log("its done");
                      var alertPopup = $ionicPopup.alert({
                         title: 'Attention!',
                         template: 'No staff available to add to the group. Please share the dCheck within the existing group.'
                       });

                       alertPopup.then(function(res) {
                         $state.go($state.current, {}, {reload: true});
                         console.log('Thank you for not eating my delicious ice cream cone');
                       });
                     
                  }else{
                     $ionicLoading.hide();
                      $scope.modal.show();
                  }
               
                
               
              }else if(data.code==403){
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                  title: 'Error!',
                  template: data.message,
                  buttons: [{
                      text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                         $ionicLoading.hide();
                        $state.go('home'); 
                      }
                  }]
                });
              }else{
                $ionicLoading.hide();
                var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template:data.message ,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $state.go("app.testlist",{}, {reload: true});
                            return false;
                         }
                     }]
                  });
              }
          }).error(function(err){
            $ionicLoading.hide();
              console.log(err);
              var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template: SERVER_ERROR,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $state.go("app.testlist",{}, {reload: true});
                            return false;
                         }
                     }]
                  });
          });
      }
 })

//Staff Listing Controller for Staff listing while dCheck scan process
.controller('stafflistcheckedCtrl', function($scope, $location,$ionicScrollDelegate,$ionicModal, $timeout,$state,$ionicLoading,$rootScope,LISTTESTHISTORY,STAFFSERVICE,GROUPSSERVICE,$ionicPopup,$ionicHistory) {
    
    $scope.quantity=7;
    $scope.show_overlay=false;

    $scope.filter=function(char){
     var array1=$rootScope.letter; 
     if (char in array1){
      return false;
     }else{
      return true;
     }
   }

    $scope.users=[];

      $scope.myGoBack = function() {
          $ionicHistory.goBack();
            var confirmPopup = 
                $ionicPopup.confirm({
                      title: 'Warning!',
                      template: "Are you sure you want to cancel group creation process?"
                });
                confirmPopup.then(function(res)
                     {if(res) {
                      navigator.app.backHistory();
                    } else {
                      console.log('You are not sure');
                    }
                  });
      };
      //Filterration process Starts
      $scope.showtabs=true;
      $scope.showFilterBarName=function  (argument) {
        $scope.show_overlay=true;
        $scope.showtabs=false;
        $scope.showname=true;
        $scope.showtags=false;
      }
      $scope.showFilterBarTag=function(searchname){
        $scope.show_overlay=true;
        $scope.showtabs=false;
        $scope.showname=false;
        $scope.showtags=true;
      }

      $scope.searchbyname=function(searchname){
        $scope.show_overlay=false;
        console.log(searchname);
        var userData=JSON.parse(localStorage.getItem("userData"));
        console.log(userData._id);
        $scope.userid=userData._id;
        var data={
          "user_id":$scope.userid,
          "page_no": 0,
          "limit": 10, 
          "nameSearch":searchname.toLowerCase()
        }
        console.log(data);
        $scope.gettestHistoryFilter(data);
      }

      $scope.searchbytag=function(searchtag){
        $scope.show_overlay=false;
        console.log(searchtag);
        var userData=JSON.parse(localStorage.getItem("userData"));
        console.log(userData._id);
        $scope.userid=userData._id;
        var data={
          "user_id":$scope.userid,
          "page_no": 0,
          "limit": 10, 
          "tagSearch":searchtag.toLowerCase()
        }
        console.log(data);
        $scope.gettestHistoryFilter(data);
      }

      $scope.hideSearch=function(){
        $scope.showtabs=true;
        $state.go($state.current, {}, {reload: true});
      }
       
        //Click letter event
        $scope.gotoList = function(id){
          $location.hash(id);
          $ionicScrollDelegate.anchorScroll(true);
        }

        //Create alphabet object
        function iterateAlphabet()
        {
           var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
           var numbers = new Array();
           for(var i=0; i<str.length; i++)
           {
              var nextChar = str.charAt(i);
             // console.log(nextChar);
              numbers.push(nextChar);
           }
           return numbers;
        }
        $scope.groups = [];
        for (var i=0; i<10; i++) {
          $scope.groups[i] = {
            name: i,
            items: []
          };
          for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
          }
        }
  
    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };






      //to dynamically sort an array of objects Ascending order
     function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
     }

   //Sorting userlist in Alphabetic order
      $scope.afterData=function(){
          $scope.users=$scope.users.sort(dynamicSort("first_name"));
          var users = $scope.users;
          var log = [];
          $scope.alphabet = iterateAlphabet();

          //Sort user list by first letter of name
          var tmp={};
          for(i=0;i<users.length;i++){
            
            var letter=users[i].first_name.toUpperCase().charAt(0);
            //console.log(letter);
            if( tmp[ letter] ==undefined){
              tmp[ letter]=[]
            }
              tmp[ letter].push( users[i] );
          }
          $rootScope.letter=tmp;
          $scope.sorted_users = tmp;
     }



    //Create Group and add Employees
    $scope.userlistforgrp=[];
    $scope.isChecked = false;
    $scope.userlistforgrp = [];
    $scope.checkedOrNot = function (users, isChecked, index) {
        if (isChecked) {
            $scope.userlistforgrp.push(users._id);
            console.log($scope.userlistforgrp);
        } else {
            var _index = $scope.userlistforgrp.indexOf(users);
            $scope.userlistforgrp.splice(_index, 1);
            console.log($scope.userlistforgrp);
        }
    };
    
    $scope.createGroup=function (argument) {
      if($scope.userlistforgrp==[]||$scope.userlistforgrp==""){
          var alertPopup = 
                 $ionicPopup.alert({
                  title: 'Error!',
                  template:"Please select atleast one Staff!" ,
                  buttons: [{
                      text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                          return false;
                       }
                   }]
              });
      }else{
          $ionicLoading.show();
        var data={
          user_id:$rootScope.user_id,
          users_ids:$scope.userlistforgrp,
          group_name:$rootScope.groupInfo.groupName,
          group_des:$rootScope.groupInfo.groupdesc
        }
        console.log("groupdata");
        console.log(data);
        GROUPSSERVICE.createnewgroup(data).success(function(data){
              $ionicLoading.hide();
              console.log(data);
              if(data.code==200){
                  var alertPopup = $ionicPopup.alert({
                    title: 'Congratulations!',
                    template: 'Group created Successfully!'
                });

                alertPopup.then(function(res) {
                    console.log('Thank you for sharing dCheck!');
                    $state.go("grouplistchecked",{}, {reload: true});
                });
                  
              }else if(data.code==403){
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                  title: 'Error!',
                  template: data.message,
                  buttons: [{
                      text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                         $ionicLoading.hide();
                        $state.go('home'); 
                      }
                  }]
                });
              }else{
                $ionicLoading.hide();
                 var alertPopup = 
                 $ionicPopup.alert({
                  title: 'Error!',
                  template:data.message ,
                  buttons: [{
                      text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                          $state.go("app.testlist",{}, {reload: true});
                          return false;
                       }
                   }]
              });
            }

        }).error(function(err){
          $ionicLoading.hide();
          console.log(err);
          var alertPopup = 
               $ionicPopup.alert({
                title: 'Error!',
                template: SERVER_ERROR,
                buttons: [{
                    text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                        $state.go("app.testlist",{}, {reload: true});
                        return false;
                     }
                 }]
              });
        });
      }
      
   }

      console.log($rootScope.groupData);
       //$scope.users=$rootScope.groupData.users;
      $scope.staffnotingroup=function(){
        STAFFSERVICE.staffnotingroup().success(function(data){
              console.log(data.responseData);
              if(data.code==200){
                $scope.user=data.responseData;
                if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                      console.log("its done");
                      var alertPopup = $ionicPopup.alert({
                         title: 'Attention!',
                         template: 'No staff available to add to the group. Please share the dCheck within the existing group.'
                       });

                       alertPopup.then(function(res) {
                         $state.go("grouplistchecked");
                         console.log('Thank you for not eating my delicious ice cream cone');
                       });
                      $scope.nothingtoshow=true;
                  }else{
                      
                      $scope.nothingtoshow=false;
                  }
                angular.forEach(data.responseData, function(resdata){
                   $scope.users.push(resdata);
                });
                $ionicLoading.hide();
                $scope.afterData();
              }else if(data.code==403){
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                  title: 'Error!',
                  template: data.message,
                  buttons: [{
                      text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                         $ionicLoading.hide();
                        $state.go('home'); 
                      }
                  }]
                });
              }else{
                $ionicLoading.hide();
                var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template:data.message ,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $state.go("app.testlist",{}, {reload: true});
                            return false;
                         }
                     }]
                  });
              }
          }).error(function(err){
            $ionicLoading.hide();
              console.log(err);
              var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template: SERVER_ERROR,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $state.go("app.testlist",{}, {reload: true});
                            return false;
                         }
                     }]
                  });
          });
      }
      //Load Test History
      $scope.users=[];
      $scope.loadstaff=function(){
          $ionicLoading.show({
            template: 'Loading...',
          })
          console.log(JSON.parse(localStorage.getItem("userData")));
          var userData=JSON.parse(localStorage.getItem("userData"));
          console.log(userData._id);
          $scope.userid=userData._id;
          $scope.page_no=0;
          $scope.staffnotingroup();
       }

      //Self calling function for Test History listing
      $scope.loadstaff();
 })


//GStaff Listing Controller to create and update Existing group
.controller('get_existing_staff_list_update_group_Ctrl', function($scope, $location,$ionicScrollDelegate,$ionicModal, $timeout,$state,$ionicLoading,$rootScope,LISTTESTHISTORY,STAFFSERVICE,GROUPSSERVICE,$ionicPopup,$ionicHistory) {
        $scope.shouldShowDelete = false;
        $scope.shouldShowReorder = false;
        $scope.listCanSwipe = true;
        $scope.quantity=7;
        $scope.show_overlay=false;

        $scope.filter=function(char){
         var array1=$rootScope.letter; 
         if (char in array1){
          return false;
         }else{
          return true;
         }
       }

        $scope.users=[];

        $scope.myGoBack = function() {
           $state.go("app.grouplist");
        };
       

        //Create alphabet object
        function iterateAlphabet()
        {
           var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
           var numbers = new Array();
           for(var i=0; i<str.length; i++)
           {
              var nextChar = str.charAt(i);
             // console.log(nextChar);
              numbers.push(nextChar);
           }
           return numbers;
        }
        $scope.groups = [];
        for (var i=0; i<10; i++) {
          $scope.groups[i] = {
            name: i,
            items: []
          };
          for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
          }
        }
  
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
          if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
          } else {
            $scope.shownGroup = group;
          }
        };
        $scope.isGroupShown = function(group) {
          return $scope.shownGroup === group;
        };




        //To remove group member from the group
        $scope.removestaff=function (item) {
           console.log(item._id);
           var datajson= {"group_id":$rootScope.groupIdToEditStaff,"users_ids":[item._id]}
           GROUPSSERVICE.removeusersfromexistinggroup(datajson).success(function(data){
                console.log(data);
                if(data.code==200){
                  var alertPopup = $ionicPopup.alert({
                       title: 'Success!',
                       template: 'Staff member removed successfully from the group!'
                     });

                     alertPopup.then(function(res) {
                       $state.go($state.current, {}, {reload: true});
                     });
                  
                }else if(data.code==403){
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                    title: 'Error!',
                    template: data.message,
                    buttons: [{
                        text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                           $ionicLoading.hide();
                          $state.go('home'); 
                        }
                    }]
                  });
                }else{
                  $ionicLoading.hide();
                    var alertPopup = 
                    $ionicPopup.alert({
                    title: 'Error!',
                    template:data.message ,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $state.go("app.grouplist",{}, {reload: true});
                            return false;
                         }
                     }]
                  });
                }
           }).error(function(err){
            $ionicLoading.hide();
                console.log(err);
                  var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template: SERVER_ERROR,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                             $state.go("app.grouplist",{}, {reload: true});
                            return false;
                         }
                     }]
                  });
           });
          
         }


         //Add new staff to existing Group
         $scope.addNewStafftoExistingGroup=function(){
               $ionicLoading.show({
                  template: 'Loading...',
                })
               STAFFSERVICE.staffnotingroup().success(function(data){
                  console.log(data.responseData);
                  if(data.code==200){
                    $scope.user=data.responseData;
                    if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                          $ionicLoading.hide();
                          console.log("its done");
                          var alertPopup = $ionicPopup.alert({
                             title: 'Attention!',
                             template: 'No staff available to add to the group.'
                           });

                           alertPopup.then(function(res) {
                             $state.go($state.current, {}, {reload: true});
                             console.log('Thank you for not eating my delicious ice cream cone');
                           });
                         
                      }else{
                         $ionicLoading.hide();
                         $state.go("addNewStaffToGroup");
                      }
                   
                  }else if(data.code==403){
                      $ionicLoading.hide();
                      var alertPopup = $ionicPopup.alert({
                      title: 'Error!',
                      template: data.message,
                      buttons: [{
                          text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                             $ionicLoading.hide();
                            $state.go('home'); 
                          }
                      }]
                    });
                  }else{
                    $ionicLoading.hide();
                    var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template:data.message ,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                $state.go("app.grouplist",{}, {reload: true});
                                return false;
                             }
                         }]
                      });
                  }
              }).error(function(err){
                $ionicLoading.hide();
                  console.log(err);
                  var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template: SERVER_ERROR,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                 $state.go("app.grouplist",{}, {reload: true});
                                return false;
                             }
                         }]
                      });
              });
         }
        



          //to dynamically sort an array of objects Ascending order
         function dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
         }

          //Sorting userlist in Alphabetic order
          $scope.afterData=function(){
              $scope.users=$scope.users.sort(dynamicSort("first_name"));
              var users = $scope.users;
              var log = [];
              $scope.alphabet = iterateAlphabet();

              //Sort user list by first letter of name
              var tmp={};
              for(i=0;i<users.length;i++){
                
                var letter=users[i].first_name.toUpperCase().charAt(0);
                //console.log(letter);
                if( tmp[ letter] ==undefined){
                  tmp[ letter]=[]
                }
                  tmp[ letter].push( users[i] );
              }
              $rootScope.letter=tmp;
              $scope.sorted_users = tmp;
         }



        //Create Group and add Employees
        $scope.userlistforgrp=[];
        $scope.isChecked = false;
        $scope.userlistforgrp = [];
        $scope.checkedOrNot = function (users, isChecked, index) {
            if (isChecked) {
                $scope.userlistforgrp.push(users._id);
                console.log($scope.userlistforgrp);
            } else {
                var _index = $scope.userlistforgrp.indexOf(users);
                $scope.userlistforgrp.splice(_index, 1);
                console.log($scope.userlistforgrp);
            }
        };
        


       $scope.staffingroup=function(){
            var datajson={"group_id":$rootScope.groupIdToEditStaff,"page_no":0,"limit":10}
            console.log(datajson);
            STAFFSERVICE.staffinexistinggroup(datajson).success(function(data){
                  console.log(data.responseData);
                  if(data.code==200){
                    $scope.user=data.responseData;
                    if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                          console.log("its done");
                          $scope.nothingtoshow=true;
                      }else{
                          $scope.nothingtoshow=false;
                      }
                    angular.forEach(data.responseData, function(resdata){
                       $scope.users.push(resdata);
                    });
                    $ionicLoading.hide();
                    $scope.afterData();
                  }else if(data.code==403){
                      $ionicLoading.hide();
                      var alertPopup = $ionicPopup.alert({
                      title: 'Error!',
                      template: data.message,
                      buttons: [{
                          text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                             $ionicLoading.hide();
                            $state.go('home'); 
                          }
                      }]
                    });
                  }else{
                    $ionicLoading.hide();
                    var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template:data.message ,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                $state.go("app.testlist",{}, {reload: true});
                                return false;
                             }
                         }]
                      });
                  }
              }).error(function(err){
                $ionicLoading.hide();
                  console.log(err);
                  var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template: SERVER_ERROR,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                $state.go("app.testlist",{}, {reload: true});
                                return false;
                             }
                         }]
                      });
              });
        }
          //Load Test History
          $scope.users=[];
          $scope.loadstaff=function(){
              $ionicLoading.show({
                template: 'Loading...',
              })
              console.log(JSON.parse(localStorage.getItem("userData")));
              var userData=JSON.parse(localStorage.getItem("userData"));
              console.log(userData._id);
              $scope.userid=userData._id;
              $scope.page_no=0;
              $scope.staffingroup();
           }

          //Self calling function for Test History listing
          $scope.loadstaff();
 })

//Staff Listing Controller for group to create new grpoup
.controller('add_new_staff_to_existing_group_Ctrl', function($scope, $location,$ionicScrollDelegate,$ionicModal, $timeout,$state,$ionicLoading,$rootScope,LISTTESTHISTORY,STAFFSERVICE,GROUPSSERVICE,$ionicPopup,$ionicHistory) {
        $scope.quantity=7;
        $scope.show_overlay=false;

        $scope.filter=function(char){
         var array1=$rootScope.letter; 
         if (char in array1){
          return false;
         }else{
          return true;
         }
       }

        $scope.users=[];

        $scope.myGoBack = function() {
          var confirmPopup = 
          $ionicPopup.confirm({
                title: 'Warning!',
                template: "Are you sure you want to cancel group creation process?"
          });
          confirmPopup.then(function(res)
               {if(res) {
                 $state.go("app.grouplist");
              } else {
                console.log('You are not sure');
              }
            });
           
        };
       

        //Create alphabet object
        function iterateAlphabet()
        {
           var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
           var numbers = new Array();
           for(var i=0; i<str.length; i++)
           {
              var nextChar = str.charAt(i);
             // console.log(nextChar);
              numbers.push(nextChar);
           }
           return numbers;
        }
        $scope.groups = [];
        for (var i=0; i<10; i++) {
          $scope.groups[i] = {
            name: i,
            items: []
          };
          for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
          }
        }
  
        /*
         * if given group is the selected group, deselect it
         * else, select the given group
         */
        $scope.toggleGroup = function(group) {
          if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
          } else {
            $scope.shownGroup = group;
          }
        };
        $scope.isGroupShown = function(group) {
          return $scope.shownGroup === group;
        };



          //to dynamically sort an array of objects Ascending order
         function dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
         }

          //Sorting userlist in Alphabetic order
          $scope.afterData=function(){
              $scope.users=$scope.users.sort(dynamicSort("first_name"));
              var users = $scope.users;
              var log = [];
              $scope.alphabet = iterateAlphabet();

              //Sort user list by first letter of name
              var tmp={};
              for(i=0;i<users.length;i++){
                
                var letter=users[i].first_name.toUpperCase().charAt(0);
                //console.log(letter);
                if( tmp[ letter] ==undefined){
                  tmp[ letter]=[]
                }
                  tmp[ letter].push( users[i] );
              }
              $rootScope.letter=tmp;
              $scope.sorted_users = tmp;
         }



        //Create Group and add Employees
        $scope.userlistforgrp=[];
        $scope.isChecked = false;
        $scope.userlistforgrp = [];
        $scope.checkedOrNot = function (users, isChecked, index) {
            if (isChecked) {
                $scope.userlistforgrp.push(users._id);
                console.log($scope.userlistforgrp);
            } else {
                var _index = $scope.userlistforgrp.indexOf(users);
                $scope.userlistforgrp.splice(_index, 1);
                console.log($scope.userlistforgrp);
            }
        };
         
         //Add new employees to Existing group
         $scope.addToExistingGroup=function () {
              if($scope.userlistforgrp==[]||$scope.userlistforgrp==""){
                var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template: "Please select atleast one Staff!",
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              return false;
                           }
                       }]
                    });
              }else{
                 $ionicLoading.show();

              var datajson={"group_id":$rootScope.groupIdToEditStaff,"users_ids": $scope.userlistforgrp}
              console.log(datajson);
               GROUPSSERVICE.adduserstoexistinggroup(datajson).success(function(data){
                    $ionicLoading.hide();
                    console.log(data);
                    if(data.code==200){
                        var alertPopup = $ionicPopup.alert({
                          title: 'Congratulations!',
                          template: 'Employees added to group successfully!'
                      });

                      alertPopup.then(function(res) {
                          console.log('Thank you for sharing dCheck!');
                          delete $rootScope.groupIdToEditStaff;
                          $state.go("app.grouplist",{}, {reload: true});
                      });
                        
                    }else if(data.code==403){
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: data.message,
                        buttons: [{
                            text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                               $ionicLoading.hide();
                              $state.go('home'); 
                            }
                        }]
                      });
                    }else{
                      $ionicLoading.hide();
                       var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template:data.message ,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                $state.go("app.grouplist",{}, {reload: true});
                                return false;
                             }
                         }]
                    });
                  }

              }).error(function(err){
                $ionicLoading.hide();
                console.log(err);
                var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template: SERVER_ERROR,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.grouplist",{}, {reload: true});
                              return false;
                           }
                       }]
                    });
              });
              }
             
         }

         
           //$scope.users=$rootScope.groupData.users;
          $scope.staffnotingroup=function(){
            //$ionicLoading.show();
            STAFFSERVICE.staffnotingroup().success(function(data){
                  console.log(data.responseData);
                  if(data.code==200){
                    $scope.user=data.responseData;
                    if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                          console.log("its done");
                          var alertPopup = $ionicPopup.alert({
                             title: 'Attention!',
                             template: 'No staff available to add to the group. Please share the dCheck within the existing group.'
                           });

                           alertPopup.then(function(res) {
                             $state.go("app.grouplist");
                             console.log('Thank you for not eating my delicious ice cream cone');
                           });
                          $scope.nothingtoshow=true;
                      }else{
                          
                          $scope.nothingtoshow=false;
                      }
                    angular.forEach(data.responseData, function(resdata){
                       $scope.users.push(resdata);
                    });
                    $ionicLoading.hide();
                    $scope.afterData();
                  }else if(data.code==403){
                      $ionicLoading.hide();
                      var alertPopup = $ionicPopup.alert({
                      title: 'Error!',
                      template: data.message,
                      buttons: [{
                          text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                             $ionicLoading.hide();
                            $state.go('home'); 
                          }
                      }]
                    });
                  }else{
                    $ionicLoading.hide();
                    var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template:data.message ,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                $state.go("app.grouplist",{}, {reload: true});
                                return false;
                             }
                         }]
                      });
                  }
              }).error(function(err){
                $ionicLoading.hide();
                  console.log(err);
                  var alertPopup = 
                       $ionicPopup.alert({
                        title: 'Error!',
                        template: SERVER_ERROR,
                        buttons: [{
                            text: 'Ok' ,
                            type: 'button-assertive',
                            onTap: function(e) {
                                $state.go("app.grouplist",{}, {reload: true});
                                return false;
                             }
                         }]
                      });
              });
          }
          //Load Test History
          $scope.users=[];
          $scope.loadstaff=function(){
              $ionicLoading.show({
                template: 'Loading...',
              })
              console.log(JSON.parse(localStorage.getItem("userData")));
              var userData=JSON.parse(localStorage.getItem("userData"));
              console.log(userData._id);
              $scope.userid=userData._id;
              $scope.page_no=0;
              $scope.staffnotingroup();
           }

          //Self calling function for Test History listing
          $scope.loadstaff();
 })


//Staff Listing Controller for group to create new grpoup
.controller('staff_list_create_new_group_Ctrl', function($scope, $location,$ionicScrollDelegate,$ionicModal, $timeout,$state,$ionicLoading,$rootScope,LISTTESTHISTORY,STAFFSERVICE,GROUPSSERVICE,$ionicPopup,$ionicHistory) {
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
    $scope.quantity=7;
    $scope.show_overlay=false;


    //Filterration process Starts
      $scope.showtabs=true;
      $scope.hideoverlay=function(){
        $scope.show_overlay=false;
        $scope.showtabs=false;
        $scope.showname=false;
        $scope.showtags=true;
        $state.go($state.current, {}, {reload: true});         //reload state
      }

      $scope.showFilterBarName=function  (argument) {
        $scope.show_overlay=true;
        $scope.showtabs=false;
        $scope.showname=true;
        $scope.showtags=false;
        $timeout(function () {          
          document.getElementById('searchname').select();
          cordova.plugins.Keyboard.show();     
         }, 0);
      }
      $scope.showFilterBarTag=function(searchname){
        $scope.focusInput=true;
        $scope.show_overlay=true;
        $scope.showtabs=false;
        $scope.showname=false;
        $scope.showtags=true;
        $timeout(function () {          
          document.getElementById('searchtag').select();  
           cordova.plugins.Keyboard.show();   
         }, 0);
      }

      $scope.searchbyname=function(searchname){
        $scope.show_overlay=false;
        console.log(searchname);
        var userData=JSON.parse(localStorage.getItem("userData"));
        console.log(userData._id);
        $scope.userid=userData._id;
        var data={
          "user_id":$scope.userid,
          "nameSearch":searchname.toLowerCase()
        }
        console.log(data);
        $scope.gettestHistoryFilter(data);
      }

      $scope.searchbytag=function(searchtag){
        $scope.show_overlay=false;
        console.log(searchtag);
        var userData=JSON.parse(localStorage.getItem("userData"));
        console.log(userData._id);
        $scope.userid=userData._id;
        var data={
          "user_id":$scope.userid,
          "tagSearch":searchtag.toLowerCase()
        }
        console.log(data);
        $scope.gettestHistoryFilter(data);
      }

      $scope.hideSearch=function(){
        console.log("gfgf");
         $scope.show_overlay=false;
        $scope.showtabs=true;
        $state.go($state.current, {}, {reload: true});         //reload state
      }



       $scope.gettestHistoryFilter=function(data){
          
          LISTTESTHISTORY.testlisthistoryfull(data).success(function(data){
                console.log(data.responseData);
                if(data.code==200){
                  $scope.users=data.responseData;
                  if(data.responseData==[]||data.responseData==null||data.responseData==undefined||data.responseData==""){
                    $scope.nothingtoshow=true;
                  }else{
                    $scope.nothingtoshow=false;
                  }
                  $scope.afterData();
                }else if(data.code==403){
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                  title: 'Error!',
                  template: data.message,
                  buttons: [{
                      text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                         $ionicLoading.hide();
                        $state.go('home'); 
                      }
                  }]
                });
              }else{
                $ionicLoading.hide();
                  var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template:data.message ,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {

                              $state.go("app.testlist");
                              return false;
                           }
                       }]
                    });
                }
            }).error(function(err){
              $ionicLoading.hide();
                console.log(err);
                var alertPopup = 
                     $ionicPopup.alert({
                      title: 'Error!',
                      template: SERVER_ERROR,
                      buttons: [{
                          text: 'Ok' ,
                          type: 'button-assertive',
                          onTap: function(e) {
                              $state.go("app.testlist");
                              return false;
                           }
                       }]
                    });
            });
        }
    $scope.filter=function(char){
       var array1=$rootScope.letter; 
       if (char in array1){
        return false;
       }else{
        return true;
       }
     }

    $scope.users=[];
      

      $scope.myGoBack = function() {
         
            var confirmPopup = 
                $ionicPopup.confirm({
                      title: 'Warning!',
                      template: "Are you sure you want to cancel group creation process?"
                });
                confirmPopup.then(function(res)
                     {if(res) {
                       $ionicHistory.goBack();
                    } else {
                      console.log('You are not sure');
                    }
                  });
      } 

        //Create alphabet object
        function iterateAlphabet()
        {
           var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
           var numbers = new Array();
           for(var i=0; i<str.length; i++)
           {
              var nextChar = str.charAt(i);
             // console.log(nextChar);
              numbers.push(nextChar);
           }
           return numbers;
        }
        $scope.groups = [];
        for (var i=0; i<10; i++) {
          $scope.groups[i] = {
            name: i,
            items: []
          };
          for (var j=0; j<3; j++) {
            $scope.groups[i].items.push(i + '-' + j);
          }
        }
  
    /*
     * if given group is the selected group, deselect it
     * else, select the given group
     */
    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };

      //to dynamically sort an array of objects Ascending order
     function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
     }

   //Sorting userlist in Alphabetic order
      $scope.afterData=function(){
          $scope.users=$scope.users.sort(dynamicSort("first_name"));
          var users = $scope.users;
          var log = [];
          $scope.alphabet = iterateAlphabet();

          //Sort user list by first letter of name
          var tmp={};
          for(i=0;i<users.length;i++){
            
            var letter=users[i].first_name.toUpperCase().charAt(0);
            //console.log(letter);
            if( tmp[ letter] ==undefined){
              tmp[ letter]=[]
            }
              tmp[ letter].push( users[i] );
          }
          $rootScope.letter=tmp;
          $scope.sorted_users = tmp;
     }



    //Create Group and add Employees
    $scope.userlistforgrp=[];
    $scope.isChecked = false;
    $scope.userlistforgrp = [];
    $scope.checkedOrNot = function (users, isChecked, index) {
        if (isChecked) {
            $scope.userlistforgrp.push(users._id);
            console.log($scope.userlistforgrp);
        } else {
            var _index = $scope.userlistforgrp.indexOf(users);
            $scope.userlistforgrp.splice(_index, 1);
            console.log($scope.userlistforgrp);
        }
    };
    
     console.log($rootScope.groupData);
     console.log($rootScope.user_id);
      $scope.createGroup=function (argument) {
        $ionicLoading.show();
        var data={
          user_id:$rootScope.user_id,
          users_ids:$scope.userlistforgrp,
          group_name:$rootScope.groupInfo.groupName,
          group_des:$rootScope.groupInfo.groupdesc
        }
        console.log("groupdata");
        console.log(data);
        GROUPSSERVICE.createnewgroup(data).success(function(data){
              $ionicLoading.hide();
              console.log(data);
              if(data.code==200){
                  var alertPopup = $ionicPopup.alert({
                    title: 'Congratulations!',
                    template: 'Group created Successfully!'
                });

                alertPopup.then(function(res) {
                    console.log('Thank you for sharing dCheck!');
                    $state.go("app.grouplist",{}, {reload: true});
                });
                  
              }else if(data.code==403){
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                  title: 'Error!',
                  template: data.message,
                  buttons: [{
                      text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                         $ionicLoading.hide();
                        $state.go('home'); 
                      }
                  }]
                });
              }else{
                $ionicLoading.hide();
                 var alertPopup = 
                 $ionicPopup.alert({
                  title: 'Error!',
                  template:data.message ,
                  buttons: [{
                      text: 'Ok' ,
                      type: 'button-assertive',
                      onTap: function(e) {
                          $state.go("app.grouplist",{}, {reload: true});
                          return false;
                       }
                   }]
              });
            }

        }).error(function(err){
          $ionicLoading.hide();
          console.log(err);
          var alertPopup = 
               $ionicPopup.alert({
                title: 'Error!',
                template: SERVER_ERROR,
                buttons: [{
                    text: 'Ok' ,
                    type: 'button-assertive',
                    onTap: function(e) {
                        $state.go("app.grouplist",{}, {reload: true});
                        return false;
                     }
                 }]
              });
        });
   }
     
      
      $scope.staffnotingroup=function(){
        //$ionicLoading.show();
        STAFFSERVICE.staffnotingroup().success(function(data){
              console.log(data.responseData);
              if(data.code==200){
                $scope.user=data.responseData;
                if($scope.user==[] || $scope.user==null || $scope.user==undefined ||$scope.user==""){
                      console.log("its done");
                      $scope.nothingtoshow=true;
                  }else{
                      $scope.nothingtoshow=false;
                  }
                angular.forEach(data.responseData, function(resdata){
                   $scope.users.push(resdata);
                });
                $ionicLoading.hide();
                $scope.afterData();
              }else if(data.code==403){
                $ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
                title: 'Error!',
                template: data.message,
                buttons: [{
                    text: 'Ok' ,
                  type: 'button-assertive',
                  onTap: function(e) {
                       $ionicLoading.hide();
                      $state.go('home'); 
                    }
                }]
              });
            }else{
              $ionicLoading.hide();
                var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template:data.message ,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $state.go("app.grouplist",{}, {reload: true});
                            return false;
                         }
                     }]
                  });
              }
          }).error(function(err){
            $ionicLoading.hide();
              console.log(err);
              var alertPopup = 
                   $ionicPopup.alert({
                    title: 'Error!',
                    template: SERVER_ERROR,
                    buttons: [{
                        text: 'Ok' ,
                        type: 'button-assertive',
                        onTap: function(e) {
                            $state.go("app.grouplist",{}, {reload: true});
                            return false;
                         }
                     }]
                  });
          });
      }
      //Load Test History
      $scope.users=[];
      $scope.loadstaff=function(){
          $ionicLoading.show({
            template: 'Loading...',
          })
          console.log(JSON.parse(localStorage.getItem("userData")));
          var userData=JSON.parse(localStorage.getItem("userData"));
          console.log(userData._id);
          $scope.userid=userData._id;
          $scope.page_no=0;
          $scope.staffnotingroup();
       }

      //Self calling function for Test History listing
      $scope.loadstaff();
 })

//Test Details Controller
.controller('testDetailsCtrl', function($scope, $ionicModal, $state,$timeout,$ionicLoading,$ionicPopup) {
   
    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;
    $scope.items=[{
      title:"Fsdfsd",
      description:"dfsdf",
      img:"img/a1.jpg"
    }];

   //Show Loading process
    $scope.show = function() {
          $ionicLoading.show({
            template: 'Loading...',
            duration: 3000
          }).then(function(){
             console.log("The loading indicator is now displayed");
          });
      };
   
   //Hide Loading process
    $scope.hide = function(){
          $ionicLoading.hide().then(function(){
             console.log("The loading indicator is now hidden");
          });
      };

      $scope.show();                       
      $timeout(function(){
         $ionicLoading.hide();
      }, 3000);
 })

//Welcome tour controller
.controller('welcometourCtrl', function($scope,$window,$ionicPopup, $rootScope,$stateParams, $ionicSlideBoxDelegate,$rootScope,$state,$window,$ionicLoading) {
   
        //document.getElementById('listcard').style.height=dynamicHeight+'px';
        function showBanner(index) {
            var oldElm = document.querySelector('.slider ion-slide.slider-slide.current');
            var q = '.slider ion-slide.slider-slide[data-index="' + index + '"]';
            var elm = document.querySelector(q);

            console.log("Show banner " + index);
            
            // Remove class "current"
            if (null !== oldElm) {
              oldElm.classList.remove("current");
            }

            // Add class "current" to current slide
            if (null !== elm) {
              elm.classList.add("current");
            }
          }

          $scope.activeSlide = 1;
         
           

          setTimeout(function() {
            showBanner($scope.activeSlide);
          }, 100);

          $scope.slideChanged = showBanner;  


          $scope.doSomething=function  (argument) {
              $state.go('app.testlist'); 
          }; 


          setTimeout(function() {
                  var dev_height= $window.innerHeight;
                  var dev_width= $window.innerWidth;
                  console.log("width"+dev_width);
                  var sliderHeaderheight= document.getElementById('headwrwelcome').clientHeight;
                  var dynamicHeight=dev_height-sliderHeaderheight-110;
                  console.log(document.getElementsByClassName('card'));

                  var sliderAll=document.getElementsByClassName('card');
                  console.log(sliderAll.length);
                  for(var i=0;i<sliderAll.length;i++){
                    console.log("here"+i);
                       sliderAll[i].style.height=dynamicHeight+'px';
                       console.log("dsf"+sliderAll[i].clientHeight);

                  }
          }, 100);

          $ionicLoading.hide();

         // var headwr_welcome= document.getElementById("headwr_welcome").clientHeight;
       //   console.log($rootScope.deviceheight);
        //  document.getElementsByClassName("slider-wrap")[0].style.height=$rootScope.deviceheight - headwr_welcome +"px";
    //console.log(document.getElementsByClassName("slider-wrap")[0].clientHeight);
})

.controller('settingCtrl', function($scope, $ionicModal, $timeout,$state,SETTINGUPDATEPRFILE,$cordovaToast,$ionicLoading,$ionicPopup) {

  // Form data for the login modal
  $scope.userDataforSetting={
      emailnotification:false,
      phonenotification:false
  }
  $scope.userData= JSON.parse(localStorage.getItem("userData"));
  

  $scope.getUserData=function(){
      $ionicLoading.show({
        template: 'Loading...',
      })
      var datajson={"user_id":$scope.userData._id}
      console.log(datajson);
      SETTINGUPDATEPRFILE.showuserdata(datajson).success(function(data){
        $ionicLoading.hide();
        if(data.code==200){
           console.log(data.userData);
          $scope.userDataforSetting=data.userData;
          console.log("data.data");
        }else if(data.code==403){
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: data.message,
            buttons: [{
                text: 'Ok' ,
              type: 'button-assertive',
              onTap: function(e) {
                   $ionicLoading.hide();
                  $state.go('home'); 
                }
            }]
          });
        }else{
          $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: data.message,
            buttons: [{
                text: 'Ok' ,
              type: 'button-assertive',
              onTap: function(e) {
                   $ionicLoading.hide();
                  $state.go('home'); 
                }
            }]
          });
        }
       

      }).error(function(err){
        console.log(err);

      });
     
  }
  $scope.getUserData();

  $scope.phonenotificationchange=function(phonenotification){
      if(phonenotification==true){
          var datajson={
               "user_id" :$scope.userDataforSetting._id,
               "push_notification":"true"
            }
      }else{
           var datajson={
                 "user_id" :$scope.userDataforSetting._id,
                 "push_notification":"false"
         }
      }
      console.log(datajson);
      SETTINGUPDATEPRFILE.updatesettings(datajson).success(function(data){
        $ionicLoading.hide();
        console.log(data.data);
        if(data.code==200){
            if(data.data.push_notification==true){
                console.log("push_notification");
               $cordovaToast.showLongBottom('Push Notification Activated Successfully!').then(function(success) {  }, function (error) {});  
            }else if(data.data.push_notification==false){
                $cordovaToast.showLongBottom('Push Notification Deactivated Successfully!').then(function(success) {  }, function (error) {});  
            }
        }else if(data.code==403){
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: data.message,
            buttons: [{
                text: 'Ok' ,
              type: 'button-assertive',
              onTap: function(e) {
                   $ionicLoading.hide();
                  $state.go('home'); 
                }
            }]
          });
        }else{
          $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: data.message,
            buttons: [{
                text: 'Ok' ,
              type: 'button-assertive',
              onTap: function(e) {
                   $ionicLoading.hide();
                  $state.go('home'); 
                }
            }]
          });
        }
        
            
      }).error(function(err){
          console.log(err);
      });
      
  }
    $scope.emailnotificationchange=function(emailnotification){
      if(emailnotification==true){
          var datajson={
               "user_id" :$scope.userDataforSetting._id,
               "email_notification":"true"
            }
      }else{
           var datajson={
                 "user_id" :$scope.userDataforSetting._id,
                 "email_notification":"false"
         }
      }
     
      console.log(datajson);
      SETTINGUPDATEPRFILE.updatesettings(datajson).success(function(data){
        $ionicLoading.hide();
        console.log(data.data);
        if(data.code==200){
          if(data.data.email_notification==true){
             $cordovaToast.showLongBottom('Email Notification Activated Successfully!').then(function(success) {  }, function (error) {});  
        }else if(data.data.email_notification==false){
            $cordovaToast.showLongBottom('Email Notification Deactivated Successfully!').then(function(success) {  }, function (error) {});  
        }
        
        }else if(data.code==403){
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: data.message,
            buttons: [{
                text: 'Ok' ,
              type: 'button-assertive',
              onTap: function(e) {
                   $ionicLoading.hide();
                  $state.go('home'); 
                }
            }]
          });
        }else{
          $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
            title: 'Error!',
            template: data.message,
            buttons: [{
                text: 'Ok' ,
              type: 'button-assertive',
              onTap: function(e) {
                   $ionicLoading.hide();
                  $state.go('home'); 
                }
            }]
          });
        }
        
              
      }).error(function(err){
          console.log(err);
      });
      
  }
 })

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$state,$ionicLoading,MENUSERVICE,$ionicPopup) {

  // Form data for the login modal
  $scope.loginData = JSON.parse(localStorage.getItem("userData"));
  $scope.clientName=$scope.loginData.first_name+" "+$scope.loginData.last_name;
  localStorage.setItem("userId",$scope.loginData._id);

  $scope.logout = function(){
    $ionicLoading.show();
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    $timeout(function(){
      $ionicLoading.hide();
      $state.go('home');
    },1000);
    
   }

   function onTouch(e) {
      e.preventDefault()
   }
   
   $scope.gotoHome=function(){
      $state.go("app.testlist", {}, { reload: 'app.testlist' });
   }

   $scope.getTermcondtions=function(){
     //window.open(TERMSANDCONDITIONS, "‘_blank’","‘location=no’");
    // Keep in mind that you must add your own images to native resource.
// Images below are for sample only. They are not imported by this plugin.
      cordova.ThemeableBrowser.open(TERMSANDCONDITIONS, '_blank', {
          statusbar: {
              color: '#ffffffff'
          },
          toolbar: {
              height: 44,
              //color: '#f0f0f0ff'
              color: '#295283' 
          },
          title: {
              color: '#ffffffff',
              staticText:"Terms and Conditions for Use",
              showPageTitle: true
          },
          closeButton: {
              wwwImage: 'img/close2.png',
              wwwImagePressed: 'img/back.png',
              wwwImageDensity: 3,
              align: 'left',
              event: 'closePressed'
          },
          backButtonCanClose: true
      }).addEventListener('backPressed', function(e) {
          alert('back pressed');
      }).addEventListener('helloPressed', function(e) {
          alert('hello pressed');
      }).addEventListener('sharePressed', function(e) {
          alert(e.url);
      }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
          console.error(e.message);
      }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
          console.log(e.message);
      });
   }

  $scope.pucount= 0;
  $scope.groupsCount=0;
  $scope.getcount=function(){
                var userData=JSON.parse(localStorage.getItem("userData"));
                var datajson={"user_id":userData._id}
                console.log(datajson);
                MENUSERVICE.getcountmenu(datajson).success(function(data){
                    if(data.code==200){
                      $scope.pucount= data.pucount;
                      $scope.groupsCount=data.groups;
                      
                    }else{
                      console.log(data.message);
                    }
                 }).error(function(err){
                    console.log(err);
                 });
            }
            $scope.getcount();
   
   


       
 })

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
 })

.controller('PlaylistCtrl', function($scope, $stateParams,$http,$ionicPopup) {
     $scope.loadTags = function(query) {
      return $http.get('tags.json');
      };
      $scope.tags = [
        { text: 'Tag1' }
      ];
 });