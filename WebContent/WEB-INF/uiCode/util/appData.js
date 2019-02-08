APP.SERVICES.service ('appData',['$window','dataRestore','$ionicPopup','$ionicLoading',
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

]);