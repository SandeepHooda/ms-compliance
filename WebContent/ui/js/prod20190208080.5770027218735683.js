
var APP = {};
APP.DIRECTIVE = angular.module('allDirective',[]);
APP.CONTROLLERS = angular.module('allControllers',[]);
APP.SERVICES = angular.module('allServices',[]);
APP.FACTORY = angular.module('allFact',[]);
APP.DEPENDENCIES = ['allControllers',
                    'allServices',
                    'allDirective',
                    'allFact'
                    ];
APP.OTHERDEPENDENCIES = ['ionic','ngCordova','ionic-numberpicker'];
angular.module('starter', APP.DEPENDENCIES.concat(APP.OTHERDEPENDENCIES))
.config(['$urlRouterProvider','$stateProvider','$ionicConfigProvider',
         function($urlRouterProvider,$stateProvider,$ionicConfigProvider){
	$ionicConfigProvider.tabs.position('bottom');
	 // setup an abstract state for the tabs directive
				$stateProvider.state('menu',{
					url:'/menu',
					abstract: true,
					templateUrl:'menu.html'	
					 
					
				}).state('menu.help',{
					url:'/help',
					templateUrl: 'app/help/help.html',
					controller: 'CTRL_help'
				}).state('menu.tab',{
					url:'/tab',
					abstract: true,
					templateUrl:'tabs.html'	
					 
					
				}).state('menu.tab.home',{
					url:'/home',
					views: {
						 'tab-home': {
						 templateUrl: 'app/home/home.html',
						 controller: 'CTRL_HOME'
						 }
					}	
					
				}).state('menu.tab.todo',{
					url:'/todo',
					views: {
						 'tab-todo': {
						 templateUrl: 'app/home/todo/todo.html',
						 controller: 'CTRL_TODO'
						 }
					}	
					
				})
				$urlRouterProvider.otherwise('/menu/tab/home');
			}
         ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
;APP.CONTROLLERS.controller ('CTRL_help',['$scope','$ionicLoading','$http','$ionicPopup','$state','$ionicSideMenuDelegate',
    function($scope,$ionicLoading,$http,$ionicPopup, $state, $ionicSideMenuDelegate){
	var theCtrl = this;
	
	$scope.showMenu = function () {
		if(document.URL.indexOf('/menu/login') <0){//Disable hanburger in log in state
			 $ionicSideMenuDelegate.toggleLeft();
		}
	   
	  };
	
}]);APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$state','$rootScope','$ionicLoading','$http','$ionicPopup','appData','$timeout',
    function($scope,$state,$rootScope,$ionicLoading,$http,$ionicPopup, appData,$timeout){
	//cordova plugin add cordova-plugin-googleplus --variable REVERSED_CLIENT_ID=myreversedclientid
	//cordova plugin add cordova-plugin-keyboard
	//https://github.com/apache/cordova-plugin-geolocation
	//cordova plugin add phonegap-nfc 
	//cordova plugin add cordova-plugin-vibration
	//cordova plugin add https://github.com/katzer/cordova-plugin-email-composer.git#0.8.2
	//cordova plugin add https://github.com/cowbell/cordova-plugin-geofence
	//cordova plugin add cordova-plugin-vibration
	//cordova plugin add cordova-plugin-device-motion
	//cordova plugin add cordova-plugin-whitelist
	//cordova plugin add cordova-plugin-shake
	//cordova plugin add cordova-plugin-sms
	//cordova plugin add cordova-plugin-android-permissions@0.6.0
	//cordova plugin add cordova-plugin-tts
	//cordova plugin add https://github.com/macdonst/SpeechRecognitionPlugin org.apache.cordova.speech.speechrecognition
	//cordova plugin add https://github.com/SandeepHooda/Speachrecognization org.apache.cordova.speech.speechrecognition
	//cordova plugin add https://github.com/katzer/cordova-plugin-background-mode.git
//	cordova plugin add cordova-plugin-http
	//cordova plugin add cordova-plugin-contacts-phonenumbers
	//cordova plugin add https://github.com/boltex/cordova-plugin-powermanagement
	//cordova plugin add https://github.com/katzer/cordova-plugin-local-notifications de.appplant.cordova.plugin.local-notification
	 var config = {
	            headers : {
	                'Content-Type': 'application/json;'
	            }
	        }
	
	
	var theCtrl = this;
	
	$scope.callCxf = function(){
		
		
		 $http.get(appData.getHost()+'/ws/poc/pocendpoint')
	  		.then(function(response){
	  			$scope.cxfResult = response.data.showButtonFlag ;
	  			
	  			
	  		},
			function(response){
	  			
	  			
			});
	}
	
	
	 
}]);APP.CONTROLLERS.controller ('CTRL_TODO',['$scope','$state','$rootScope','$ionicLoading','$http','$ionicPopup','appData',
    function($scope,$state,$rootScope,$ionicLoading,$http,$ionicPopup, appData){
	
	
	var theCtrl = this;
	
		  
		 
		  
	 
}]);APP.SERVICES.service ('appData',['$window','dataRestore','$ionicPopup',
    function( $window,dataRestore, $ionicPopup){
	
	this.getHost = function () {
		
		var host = "/Ionic_CXF_Seed";
		
		
		return host;
	}
	
	this.showErrorMessage = function(httpCode){
		if ( httpCode == 403){
			var confirmPopup = $ionicPopup.confirm({
			     title: 'Password mimatch',
			     template: 'Your password donot match our records.'
			   });
			 confirmPopup.then(function(res) {
			  });
		}else {
			var confirmPopup = $ionicPopup.confirm({
			     title: 'Internal Server Error',
			     template: 'Something unusual happened at server.'
			   });
			 confirmPopup.then(function(res) {
			  });
				
		}
	}
	
	this.getOfferItems = function(){
		return this.offerItems;
	}
	this.setOfferItems = function(offerItems){
		this.offerItems = offerItems;
	}
	this.getCartItems = function(){
		return this.cartItems;
	}
	
	
}

]);;APP.SERVICES.service('dataRestore', function($rootScope) {
	
	this.saveInCache = function (key, value) {
		window.localStorage.setItem(key, JSON.stringify(value))
	}
	this.getFromCache = function (key, type) {
		var value = "";
		
		if (type === 'boolean'){
			value = false;
			if (window.localStorage.getItem(key) === 'true'){
				value = true;
			}
		}
		
		if (type === 'number'){
			value = parseInt(window.localStorage.getItem(key))
			if (isNaN(value) ){
				value = 0; 
			}
		}
		
		if (type === 'str' || type == undefined || type == null){
			value = window.localStorage.getItem(key)
			if (value == null || value == 'null'){
				value = "";
			}
			
		}
		if (type === 'obj' ){
			value = window.localStorage.getItem(key)
			if (value){
				return JSON.parse(value)
			}else {
				return null;
			}
			
		}
		return value;
	}
	  
    
});