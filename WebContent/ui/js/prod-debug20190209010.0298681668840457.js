
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
					 
					
				}).state('menu.reportees',{
					url:'/reportees',
					templateUrl: 'app/reportees/reportees.html',
					controller: 'CTRL_reportees'
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
					
				}).state('menu.login',{
					url:'/login',
					templateUrl: 'app/login/login.html',
					controller: 'CTRL_Login'
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
;APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$state','$rootScope','$ionicLoading','$http','$ionicPopup','appData','$timeout',
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
	 theCtrl.gotStatus = false;
	 theCtrl.fullComplaint = false;
	$scope.emailAddress = window.localStorage.getItem('emailID');

	$scope.mySelectedConstraints = function(data){
		  if (!data){
			  return;
		  }
		  if (data.indexOf('training') >=0){
			  theCtrl.training = true;
			}else {
				theCtrl.training = false;
				theCtrl.fullComplaint = false;
			}
			if (data.indexOf('phishing') >=0){
				theCtrl.phishing = true;
			}else {
				theCtrl.phishing = false;
				theCtrl.fullComplaint = false;
			}
			if (theCtrl.phishing && theCtrl.training){
				theCtrl.fullComplaint = true;
			}
	  }
	 $scope.getMyComplianceStatus = function(){
		 appData.showBusy();
		  $http.get(appData.getHost()+'/ws/compliance/status/'+$scope.emailAddress)
	  		.then(function(response){
	  			
	  			$scope.mySelectedConstraints( response.data.complianceTarget) ;
	  			
	  			theCtrl.gotStatus = true;
	  			appData.hideBusy();
	  			
	  		},
		function(response){
	  			appData.hideBusy();
			
		});
	  }

	 $scope.iComply  = function(){
		 var complianceTarget = [];
		 if (theCtrl.training){
			 complianceTarget.push('training');
		 }
		 if (theCtrl.phishing){
			 complianceTarget.push('phishing');
		 }
		 
		 if (complianceTarget && complianceTarget.length >=2){
			 appData.showBusy();
			 var member = {};
			 member._id = $scope.emailAddress;
			 member.complianceTarget = complianceTarget ;
			 $http.post(appData.getHost()+'/ws/compliance/iComply',member , config)
		  		.then(function(response){
		  			appData.hideBusy();
		  			theCtrl.fullComplaint = true;
		  			$scope.mySelectedConstraints( response.data.complianceTarget) ;
		  			//appData.popUp("Thanks", "We have recorded your response.");
		  		},
				function(response){
		  			appData.hideBusy();
		  			appData.popUp("Failure", " Please try again");
		  			});
		 }
		
	  }
	
	
	 
}]);APP.CONTROLLERS.controller ('CTRL_TODO',['$scope','$state','$rootScope','$ionicLoading','$http','$ionicPopup','appData',
    function($scope,$state,$rootScope,$ionicLoading,$http,$ionicPopup, appData){
	
	
	var theCtrl = this;
	
		  
		 
		  
	 
}]);APP.CONTROLLERS.controller ('CTRL_Login',['$scope','$state','$http','$ionicLoading','appData',
    function($scope,$state,$http,$ionicLoading,appData){
	var theCtrl = this;
	$scope.host = appData.getHost();
	
	 var config = {
	            headers : {
	                'Content-Type': 'application/json;'
	            }
	        }
	
	 $scope.checkEnter = function(){
			if(event.keyCode == 13){
				$scope.createUser();
			}
		}
	 $scope.createUser = function() {
		  if (!theCtrl.emailAddress){
			  return;
		  }else {
			  theCtrl.emailAddress = theCtrl.emailAddress.toLowerCase();
		  }
		   var teamMember = {};
		   teamMember._id = theCtrl.emailAddress;
		   
		   appData.showBusy();
		    
		    $http.post(appData.getHost()+'/ws/compliance/user',teamMember , config)
	  		.then(function(response){
	  			window.localStorage.setItem('emailID', theCtrl.emailAddress);
	  			appData.hideBusy();
	  			
	  			$state.transitionTo('menu.tab.home');
	  		},
			function(response){
	  			appData.hideBusy();
	  			appData.popUp("Failure", "Loging failure. Please try again");
	  			});
		}
	  
}
]);APP.CONTROLLERS.controller ('CTRL_reportees',['$scope','$ionicLoading','$http','$ionicPopup','$state','$ionicSideMenuDelegate','appData', 
    function($scope,$ionicLoading,$http,$ionicPopup, $state, $ionicSideMenuDelegate,appData ){
	var theCtrl = this;
	var config = {
            headers : {
                'Content-Type': 'application/json;'
            }
        }

	$scope.myReportees = [];
	
	$scope.showMenu = function () {
		if(document.URL.indexOf('/menu/login') <0){//Disable hanburger in log in state
			 $ionicSideMenuDelegate.toggleLeft();
		}
	   
	  };
	  
	  $scope.emailAddress = window.localStorage.getItem('emailID');
	  if (!$scope.emailAddress){
			$state.transitionTo('menu.login');
		}
	  
	  $scope.mySelectedConstraints = function(data){
		  if (!data){
			  return;
		  }
		  if (data.indexOf('training') >=0){
			  theCtrl.training = true;
			}else {
				theCtrl.training = false;
			}
			if (data.indexOf('phishing') >=0){
				theCtrl.phishing = true;
			}else {
				theCtrl.phishing = false;
			}
	  }
	  $scope.getUserDetails = function(){
		  $http.get(appData.getHost()+'/ws/compliance/userDetails/'+$scope.emailAddress)
	  		.then(function(response){
	  			
	  			$scope.myReportees = response.data.reportees ;
	  			$scope.mySelectedConstraints(response.data.coplianceTargetForTeam);
	  			
	  			
	  		},
		function(response){
			
			
		});
	  }
	
	  $scope.enforceCompliance  = function(){
		 var teamconstraints = [];
		 if (theCtrl.training){
			 teamconstraints.push('training');
		 }
		 if (theCtrl.phishing){
			 teamconstraints.push('phishing');
		 }
		 
		 appData.showBusy();
		 var manager = {};
		 manager._id = $scope.emailAddress;
		 manager.coplianceTargetForTeam = teamconstraints ;
		 $http.post(appData.getHost()+'/ws/compliance/applyConstraints',manager , config)
	  		.then(function(response){
	  			appData.hideBusy();
	  		},
			function(response){
	  			appData.hideBusy();
	  			appData.popUp("Failure", " Please try again");
	  			});
	  }
	  
	  $scope.checkEnter = function(){
			if(event.keyCode == 13){
				$scope.addReportee();
			}
		}
	 $scope.addReportee = function(position) {
		 if (!theCtrl.newReportee){
			 return;
		 }else {
			 theCtrl.newReportee = theCtrl.newReportee.toLowerCase();
		 }
		  
		   var manager = {};
		   manager._id = $scope.emailAddress ;
		   manager.reportees = [];
		   manager.reportees.push(theCtrl.newReportee);
		   appData.showBusy();
		    
		    $http.post(appData.getHost()+'/ws/compliance/reportee',manager , config)
	  		.then(function(response){
	  			theCtrl.newReportee = "";
	  			appData.hideBusy();
	  			$scope.myReportees = response.data.reportees;
	  			
	  		},
			function(response){
	  			appData.hideBusy();
	  			appData.popUp("Failure", " Please try again");
	  			});
		}
	 $scope.deleteReportee = function(index){
		 
		 var confirmPopup = $ionicPopup.confirm({
		     title: 'Confirmation',
		     template: 'Do you want to delete '+$scope.myReportees[index] +' from your team?'
		   });

		   confirmPopup.then(function(res) {
			   if (res){
				   $http.delete(appData.getHost()+'/ws/compliance/reportee/'+$scope.emailAddress+"/"+$scope.myReportees[index] )
			  		.then(function(response){
			  			
			  			appData.hideBusy();
			  			$scope.myReportees = response.data.reportees;
			  			
			  		},
					function(response){
			  			appData.hideBusy();
			  			appData.popUp("Failure", " Please try again");
			  			});
			   }
		   })
			 
			    
	}
}]);APP.SERVICES.service ('appData',['$window','dataRestore','$ionicPopup','$ionicLoading',
    function( $window,dataRestore, $ionicPopup, $ionicLoading){
	
	this.getHost = function () {
		
		var host = "";
		
		
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
	
	this.popUp = function(subject, body){
		var confirmPopup = $ionicPopup.confirm({
		     title: subject,
		     template: body
		   });
		 confirmPopup.then(function(res) {
			 
		  });
	}
	
	//Busy icon
	this.showBusy = function() {
		    $ionicLoading.show({
		      template: 'Please Wait...',
		      duration: 10000
		    }).then(function(){
		       console.log("The loading indicator is now displayed");
		    });
		  };
	this.hideBusy = function(){
		    $ionicLoading.hide().then(function(){
		       console.log("The loading indicator is now hidden");
		    });
		  };
 
	
	
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