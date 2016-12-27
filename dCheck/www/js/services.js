var dCheck = angular.module('dcheck.services', []);
console.log("dawdw");


    dCheck.factory('LOGINSERVICE',        function($q, $http) {
        return {
            Login: function(dataJSON) {
                var promise = $http({
                    url: LOGIN,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            LoginTest: function(dataJSON) {
            	var obj={name:"Ravi"};
                return obj;
            },
            LogOut: function(dataJSON) {
                var promise = $http({
                    url: LOGOUT,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            ForgotPassword: function(dataJSON) {
                var promise = $http({
                    url: FORGOTPASSWORD,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
          Checkemailexists: function(dataJSON) {
            var promise = $http({
                url: CHECK_EMAIL,
                method: 'POST',
                data:   dataJSON,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token':JSON.parse(localStorage.getItem("token"))
                }
            }).success(function(data, status, headers, config) {
                return data;
            });
            return promise;
            },

           CheckToken: function(dataJSON) {
            var promise = $http({
                url: CHECKTOKEN,
                method: 'POST',
                data:   dataJSON,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token':JSON.parse(localStorage.getItem("token"))
                }
            }).success(function(data, status, headers, config) {
                return data;
            });
                return promise;
            },
            
            ResendEmail: function(dataJSON) {
                var promise = $http({
                    url: RESEND_EMAIL,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            CheckAuthentication: function(dataJSON) {
                var promise = $http({
                    url: CHECK_AUTHENTICATION,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                }).error(function (error, status){
                    return status;
                });
                return promise;
            },
            
            CheckLogOut: function(dataJSON) {
                var promise = $http({
                    url: CHECK_LOGOUT,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
        }        
    })
    
    .factory('SETTINGUPDATEPRFILE',  function($q, $http) {
        return {
            updatesettings:function(dataJSON){
                var promise = $http({
                    url: SETTINGUSER,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            showuserdata:function(dataJSON){
                var promise = $http({
                    url: SHOWUSERDATA,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            } 
        }
    })

    .factory('CREATETEST',  function($q, $http) {
        return {
            scanproduct:function(dataJSON){
                var promise = $http({
                    url: SCANPRODUCT,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },

            saveresults:function(dataJSON){
                var promise = $http({
                    url: SAVERESULT,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             addtestexisting:function(dataJSON){
                var promise = $http({
                    url: ADDTESTEXISTING,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             deleteusertestexisting:function(dataJSON){
                var promise = $http({
                    url: DELETEUSERTESTHISTORY,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },

            getTimezoneByLatLong: function(latitude,longitude,timestamp) {
                var deferred = $q.defer(); 
                deferred.resolve($http.get(GET_TIMEZONE + latitude + ',' + longitude + '&timestamp=' + timestamp + '&key=' + GEOCODER_API_KEY));
                return deferred.promise;
            }  
        }
    })

    .factory('LISTTESTHISTORY',  function($q, $http) {
        return {
            testlisthistory:function(dataJSON){
                var promise = $http({
                    url: TESTLISTHISTORY,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            } ,
            testlisthistoryfull:function(dataJSON){
                var promise = $http({
                    url: TESTLISTHISTORYFULL,
                    method: 'POST',
                    data:   dataJSON,
                   headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            } ,
            getusertestjistorypdf:function(dataJSON){
                var promise = $http({
                    url: GETTESTHISTORYUSER,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            } ,            
            sharedcheckbymail:function(dataJSON){
                var promise = $http({
                    url: SHAREDCHECKBYMAIL,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }  ,
            showexistingtest:function(dataJSON){
                var promise = $http({
                    url: SHOWEXISTINGTEST,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             deletetest:function(dataJSON){
                var promise = $http({
                    url: DELETETEST,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }   
                     
        }
    })
    .factory('GROUPSSERVICE',  function($q, $http) {
        return {
            groupslisting:function(dataJSON){
                var promise = $http({
                    url: LISTINGGROUP,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            createnewgroup:function(dataJSON){
                var promise = $http({
                    url: CREATENEWGROUP,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            deletegroup:function(dataJSON){
                var promise = $http({
                    url: DELETEGROUP,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getgrouptestresulthistory:function(dataJSON){
                var promise = $http({
                    url: GETGROUPTESTRESULTHISTORY,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             adduserstoexistinggroup:function(dataJSON){
                var promise = $http({
                    url: ADDUSERSTOEXISTINGGROUP,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             removeusersfromexistinggroup:function(dataJSON){
                var promise = $http({
                    url: REMOVEUSERSFROMGROUP,
                    method: 'POST',
                    data:   dataJSON,
                   headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
        }
    })
    .factory('STAFFSERVICE',  function($q, $http) {
        return {
            staffnotingroup:function(dataJSON){
                var promise = $http({
                    url: GETSTAFFNOTINANYGROUP,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
             staffinexistinggroup:function(dataJSON){
                var promise = $http({
                    url: USERINGROUP,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
        }
    })
    .factory('MENUSERVICE',  function($q, $http) {
        return {
            getcountmenu:function(dataJSON){
                var promise = $http({
                    url: GETCOUNTFORMENU,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token':JSON.parse(localStorage.getItem("token"))
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
        }
    })

    .factory('HELPREQUEST',  function($q, $http) {
        var rating = '5';
        return {
            saveHelpRequest:function(dataJSON){
                var promise = $http({
                    url: SAVE_HELP_REQUEST,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getActiveHelp:function(dataJSON){
                var promise = $http({
                    url: ACTIVE_HELP,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getActiveRequest:function(dataJSON){
                
                var promise = $http({
                    url: ACTIVE_REQUEST,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    // alert(JSON.stringify(data))               
                    return data;
                });
                return promise;
            },
            getRequestHistory:function(dataJSON){
                var promise = $http({
                    url: HELP_HISTORY,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getRequestDetail:function(dataJSON){
                var promise = $http({
                    url: REQUEST_DETAIL,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            getActiveRequestDetail:function(dataJSON){
                var promise = $http({
                    url: ACTIVE_REQUEST_DETAIL,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            HelperCompleteReviewsDetail:function(dataJSON){
                var promise = $http({
                    url: HELPER_COMPLETE_REVIEWS_DETAIL,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            CustomerCompleteReviewsDetail:function(dataJSON){
                var promise = $http({
                    url: CUSTOMER_COMPLETE_REVIEWS_DETAIL,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            AcceptOffer:function(dataJSON){
                var promise = $http({
                    url: ACCEPT_OFFER,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            GetAlignedHelperDetail:function(dataJSON){
                var promise = $http({
                    url: GET_ALIGNED_HELPER_DETAIL,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            sendConfirmationToHelper:function(dataJSON){
                var promise = $http({
                    url: SEND_CONFIRMATION_TO_HELPER,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            ConfirmStartJob:function(dataJSON){
                var promise = $http({
                    url: CONFIRM_START_JOB,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            EndHelp:function(dataJSON){
                var promise = $http({
                    url: END_HELP,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            SubmitReview:function(dataJSON){
                var promise = $http({
                    url: SUBMIT_REVIEW,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            StartJobDetail:function(dataJSON){
                var promise = $http({
                    url: START_JOB_DETAIL,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            CancelHelpRequest:function(dataJSON){
                var promise = $http({
                    url: CANCEL_HELP_REQUEST,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            GetReasons:function(){
                var promise = $http({
                    url: GET_REASONS,
                    method: 'POST',
                    data:   '',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            currentJobStatus:function(dataJSON){
                var promise = $http({
                    url: CURRENT_JOB_STATUS,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            setDynamicRating: function (ratingValue) {
                var deferred = $q.defer();
                rating = ratingValue;     
                deferred.resolve(rating);
                return deferred.promise; 
            }

        }
    })

    .factory('GEOLOCATIONSERVICE',       function($q, $http) {
        return {
            getLocations: function() {
                var promise = $http.get(DEALS_LISTING).success(function(data, status, headers, config) {               
                    return data;
                });
                return promise;
            },
            getLocationByLatLong: function(latitude,longitude) {

                var deferred = $q.defer();                
                deferred.resolve($http.get(GET_ADDR + latitude + ',' + longitude +'&key='+GEOCODER_API_KEY));
                return deferred.promise;

            },
            getTimezoneByLatLong: function(latitude,longitude,timestamp) {

                var deferred = $q.defer();                 
                deferred.resolve($http.get(GET_TIMEZONE + latitude + ',' + longitude + '&timestamp=' + timestamp + '&key=' + GEOCODER_API_KEY));
                return deferred.promise;

            }
        }
    })

    .factory('CONTENTSERVICE',  function($q, $http) {
        return {
            GetTermsAndConditions :function(dataJSON){
                var promise = $http({
                    url: GET_TERMSANDCONDITIONS,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            checkTermsAndConditions :function(dataJSON){
                var promise = $http({
                    url: CHECK_TERMSANDCONDITIONS,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            updateTermsAndConditions :function(dataJSON){
                var promise = $http({
                    url: UPDATE_TERMSANDCONDITIONS,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            },
            addDisputeService :function(dataJSON){
                var promise = $http({
                    url: ADD_DISPUTE,
                    method: 'POST',
                    data:   dataJSON,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function(data, status, headers, config) {
                    return data;
                });
                return promise;
            }
        }
    })

    .service('LocationService', function($q){
        var autocompleteService = new google.maps.places.AutocompleteService();
        var detailsService = new google.maps.places.PlacesService(document.createElement("input"));
        return {
            searchAddress: function(input) {
              var deferred = $q.defer();

              autocompleteService.getPlacePredictions({
                input: input,
                componentRestrictions: {country: 'us'}
              }, function(result, status) {
                if(status == google.maps.places.PlacesServiceStatus.OK){
                  console.log(status);
                  deferred.resolve(result);
                }else{
                  deferred.reject(status)
                }
              });

              return deferred.promise;
            },
            getDetails: function(placeId) {
              var deferred = $q.defer();
              detailsService.getDetails({placeId: placeId}, function(result) {
                deferred.resolve(result);
              });
              return deferred.promise;
            }
        };
    });