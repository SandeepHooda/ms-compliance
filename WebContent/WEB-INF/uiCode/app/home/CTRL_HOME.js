APP.CONTROLLERS.controller ('CTRL_HOME',['$scope','$state','$rootScope','$ionicLoading','$http','$ionicPopup','appData','$timeout',
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
	
	
	 
}])