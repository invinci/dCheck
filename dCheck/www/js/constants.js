// SERVICE HEADER
var GLOBAL_HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    "Accept": "application/json",
    "Access-Control-Allow-Credentials":true,
    'authorization':'Basic dGF4aTphcHBsaWNhdGlvbg=='
};

var GLOBAL_HEADERS_DCHECK = {
    'x-access-token':JSON.parse(localStorage.getItem("token")),
     'Content-Type': 'application/json'
};


// HOST
//var HOST = 'http://172.24.3.140:3000/';   //Local/Development
var HOST        ='http://52.39.212.226:4035/';     //Server live
var API_PREFIX 	='apis/';






// API Links
var LOGIN   						= HOST + API_PREFIX +'login';
var LOGOUT   						= HOST + API_PREFIX + 'LogOut';
var CHECK_EMAIL                 	= HOST + API_PREFIX + 'checkTestUserEmail';
var CHECKFORMAIL                    = HOST + API_PREFIX + 'checkTestUserEmail';
var CHECKTOKEN                    = HOST + API_PREFIX + 'checkToken';


//API MENU
var GETCOUNTFORMENU                 = HOST + API_PREFIX + 'totalCounts';




//CREATE TEST API
var SCANPRODUCT                	    = HOST + API_PREFIX + 'scanProduct';
var SAVERESULT                	    = HOST + API_PREFIX + 'createTest';
var ADDTESTEXISTING                 = HOST + API_PREFIX + 'addDcheckInExistingUser';
var DELETEUSERTESTHISTORY           = HOST + API_PREFIX + 'deleteProductTestUsers';



//LIST TEST HISTORY API
var TESTLISTHISTORY                	 = HOST + API_PREFIX + 'showScannedHostory';
var TESTLISTHISTORYFULL              = HOST + API_PREFIX + 'showScannedHostoryFull';
var SHOWEXISTINGTEST                 = HOST + API_PREFIX + 'showExistingTest';
var DELETETEST                       = HOST + API_PREFIX + 'deleteTest';
var GETTESTHISTORYUSER               = HOST + API_PREFIX + 'getTestListingBasedOnUser';



//LIST GROUPS  API
var LISTINGGROUP                	 = HOST + API_PREFIX + 'getGroupListing';
var SHAREDCHECKBYMAIL                =HOST + API_PREFIX  + 'shareDcheckFile';
var CREATENEWGROUP                   =HOST + API_PREFIX  + 'createGroup';
var DELETEGROUP                      =HOST + API_PREFIX  + 'deleteGroup';
var GETGROUPTESTRESULTHISTORY        =HOST + API_PREFIX  + 'groupSharedHistory';
var ADDUSERSTOEXISTINGGROUP          =HOST + API_PREFIX  + 'addUsersInGroup';
var REMOVEUSERSFROMGROUP             =HOST + API_PREFIX  + 'deleteUsersInGroup';
var USERINGROUP                      =HOST + API_PREFIX  + 'usersInGroup';




 

//STAFF LISTING API
var GETSTAFFNOTINANYGROUP            = HOST + API_PREFIX + 'getUserNotInGroup';

//SETTING/UPDATE PROFILE API
var SETTINGUSER                      = HOST + API_PREFIX + 'profileSetting';
var SHOWUSERDATA                     = HOST + API_PREFIX + 'showUserProfile';





//LOCATION API
var ADD_LOCATION                	= HOST + API_PREFIX + 'SaveLocation';
var UPDATE_LOCATION             	= HOST + API_PREFIX + 'UpdateLocation';
var LIST_LOCATION               	= HOST + API_PREFIX + 'GetLocationDetails';
var SET_DEFAULT_LOCATION        	= HOST + API_PREFIX + 'SetDefaultLocation';
var DELETE_LOCATION             	= HOST + API_PREFIX + '/DeleteLocation';
//END OF LOCATION API

//PAYMENT API
var ADD_PAYMENT                 	= HOST + API_PREFIX + 'SavePayment';
var UPDATE_PAYMENT              	= HOST + API_PREFIX + 'UpdatePayment';
var LIST_PAYMENT                	= HOST + API_PREFIX + 'GetPaymentDetails';
var SET_DEFAULT_PAYMENT         	= HOST + API_PREFIX + 'SetDefaultPayment';
var DELETE_PAYMENT              	= HOST + API_PREFIX + 'DeletePayment';



var RESEND_EMAIL                	= HOST + API_PREFIX + 'ResendEmail';
var UPDATE_CUSTOMER             	= HOST + API_PREFIX + 'UpdateCustomer';
var CHANGE_PASSWORD             	= HOST + API_PREFIX + 'UpdatePassword';
var CHANGE_NUMBER             		= HOST + API_PREFIX + 'UpdatePhoneNumber';


var SUBCATEGORY_API					= HOST + API_PREFIX + 'GetSubCategory';
var GETHELP_API						= HOST + API_PREFIX + 'GetAvailableHelper';
var GET_ESTIMATED_TIME_NEEDED		= HOST + API_PREFIX + 'GetEstimatedTimeNeeded';
var GET_SPECIAL_DETAILS				= HOST + API_PREFIX + 'GetSpecialDetail';
var GET_HELP_DESCRIPTION			= HOST + API_PREFIX + 'GetHelpDescription';

var SAVE_HELP_REQUEST				= HOST + API_PREFIX + 'SaveCustomerRequest';
var REQUEST_DETAIL					= HOST + API_PREFIX + 'RequestDetail';
var CURRENT_JOB_STATUS              = HOST + API_PREFIX + 'CurrentJobStatus';
var ACTIVE_REQUEST_DETAIL			= HOST + API_PREFIX + 'ActiveRequestDetail';
var HELPER_COMPLETE_REVIEWS_DETAIL	= HOST + API_PREFIX + 'HelperCompleteReviewsDetail';
var CUSTOMER_COMPLETE_REVIEWS_DETAIL= HOST + API_PREFIX + 'CustomerCompleteReviewsDetail';
var ACCEPT_OFFER					= HOST + API_PREFIX + 'AcceptOffer';
var GET_ALIGNED_HELPER_DETAIL		= HOST + API_PREFIX + 'GetAlignedHelperDetail';
var CONFIRM_START_JOB				= HOST + API_PREFIX + 'ConfirmStartJob';
var END_HELP						= HOST + API_PREFIX + 'EndHelp';
var SUBMIT_REVIEW					= HOST + API_PREFIX + 'SubmitReview';
var START_JOB_DETAIL				= HOST + API_PREFIX + 'StartJobDetail';
var CANCEL_HELP_REQUEST				= HOST + API_PREFIX + 'CancelHelpRequest';
var SEND_CONFIRMATION_TO_HELPER		= HOST + API_PREFIX + 'sendConfirmationToHelper';
var GET_TERMSANDCONDITIONS			= HOST + API_PREFIX + 'GetTermsAndConditions';
var CHECK_TERMSANDCONDITIONS		= HOST + API_PREFIX + 'GetTermsandConditionStatus';
var UPDATE_TERMSANDCONDITIONS		= HOST + API_PREFIX + 'UpdateTermsandConditionStatus';

var ACTIVE_HELP						= HOST + API_PREFIX + 'GetCustomerActiveHelp';
var ACTIVE_REQUEST					= HOST + API_PREFIX + 'GetCustomerActiveRequest';
var HELP_HISTORY					= HOST + API_PREFIX + 'GetCustomerRequestHistory';
var GET_REASONS						= HOST + API_PREFIX + 'GetCancellationReason';

var ADD_DISPUTE						= HOST + API_PREFIX + 'Dispute';



var TERMSANDCONDITIONS              =HOST+'terms'

var imageUrl                        = HOST + 'Photo/';

var DEFAULT_IMAGE				    = "img/placeholder.png";


// Constants
var SERVER_ERROR = "Something went wrong. Please try again later.";
var OTHER_DEVICE = 'This user has been logged-in in some other device.';
var EXIT_APP = 'Are you sure you want to exit?';

var NO_INTER_CONNECTION_TITLE 	= "No Internet Connection";
var NO_INTER_CONNECTION_MESSAGE = 'No Internet connectivity detected. Please reconnect to internet and try again.';
var CONNECT_TO_INTERNET = 'Connect to your data connection first.';
var CONNECT_SUCCESS = 'Connected successfully.';

var LOCATION_TITLE = 'Need Your Location';
var TURN_ON_LOCATION = 'Please turn on your location to go further.';


var GIG_ENDED = 'Your Gig has been ended by your Pro. Press OK to continue.';
var SOME_ONE_OFFER = 'Someone posted an offer on your request.';