angular.module('starter').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('tabs.html',
    "<ion-tabs class=\"tabs-positive tabs-icon-bottom\"><ion-tab title=\"Compliance\" icon-on=\"icon ion-android-checkbox-outline\" icon-off=\"icon ion-android-checkbox-outline\" href=\"#/menu/tab/home\"><ion-nav-view name=\"tab-home\"></ion-nav-view></ion-tab></ion-tabs>"
  );


  $templateCache.put('menu.html',
    "<ion-view><ion-side-menus><ion-side-menu-content ng-controller=\"CTRL_reportees as $ctrl\"><ion-nav-bar class=\"bar-positive\"><ion-nav-back-button class=\"button-icon ion-arrow-left-c\"></ion-nav-back-button><ion-nav-buttons side=\"left\"><button class=\"button button-icon button-clear ion-navicon\" ng-click=\"showMenu()\"></button></ion-nav-buttons></ion-nav-bar><ion-nav-view animation=\"slide-left-right\"></ion-nav-view></ion-side-menu-content><ion-side-menu side=\"left\"><ion-header-bar class=\"bar bar-header bar-positive\"><h1 class=\"title\">Profile</h1></ion-header-bar><ion-content has-header=\"true\" class=\"custom\"><ion-list><ion-item nav-clear menu-close href=\"#menu/tab/home\"><i class=\"icon ion-android-home\"></i> Home <i class=\"ion-ios-arrow-forward pull-right\"></i></ion-item><ion-item nav-clear menu-close href=\"#menu/reportees\"><i class=\"icon ion-android-happy\"></i> My Reportees <i class=\"ion-ios-arrow-forward pull-right\"></i></ion-item><ion-item nav-clear menu-close href=\"#menu/login\"><i class=\"icon ion-android-contacts\"></i> Login <i class=\"ion-ios-arrow-forward pull-right\"></i></ion-item></ion-list></ion-content></ion-side-menu></ion-side-menus></ion-view>"
  );


  $templateCache.put('app/home/home.html',
    "<ion-view title=\"Compliance\" cache-view=\"false\" class=\"backhroundcolor\" ng-init=\"getMyComplianceStatus();\" ng-controller=\"CTRL_HOME as $ctrl\"><ion-header-bar class=\"bar-positive\"><h1 class=\"title\">Compliance</h1></ion-header-bar><ion-content class=\"padding\"><div><span class=\"userName blockDisplay\">Welcome {{emailAddress}}</span> <span ng-if=\"$ctrl.gotStatus\"><span ng-if=\"!$ctrl.fullComplaint\"><input type=\"checkbox\" name=\"training\" id=\"training\" ng-change=\"iComply()\" ng-model=\"$ctrl.training\" ng-checked=\"$ctrl.training\"><label for=\"constraintCheckBoxTraining\" style=\"color: white\"><b>No training pending</b></label><br><br><br><input type=\"checkbox\" name=\"phishing\" id=\"phishing\" ng-change=\"iComply()\" ng-model=\"$ctrl.phishing\" ng-checked=\"$ctrl.phishing\"><label for=\"constraintCheckBoxPhishing\" style=\"color: white\"><b>I didn't click any phishing email.</b></label></span><span ng-if=\"$ctrl.fullComplaint\"><img ng-src=\"/ui/img/ok.png\" class=\"Imgcenter\"></span></span></div></ion-content></ion-view>"
  );


  $templateCache.put('app/home/todo/todo.html',
    "<ion-view title=\"ToDo\" cache-view=\"false\" class=\"backhroundcolor\" ng-init=\"\" ng-controller=\"CTRL_TODO as $ctrl\"><ion-header-bar class=\"bar-positive\"><h1 class=\"title\">ToDO</h1></ion-header-bar><ion-content class=\"padding\"><div><span class=\"userName blockDisplay\">ToDo</span></div></ion-content></ion-view>"
  );


  $templateCache.put('app/login/login.html',
    "<ion-view title=\"Login\" class=\"backhroundcolor\" ng-controller=\"CTRL_Login as $ctrl\" cache-view=\"false\"><ion-header-bar class=\"bar-positive\"><h1 class=\"title\">Login</h1></ion-header-bar><ion-content class=\"padding\"><div class=\"list list-inset searchbox\"><label class=\"item item-input searchboxInput\"><input type=\"text\" placeholder=\"Work Email address\" ng-model=\"$ctrl.emailAddress\" ng-keyup=\"checkEnter()\"></label></div><br><br><button class=\"button button-calm order-button cashBtn\" ng-click=\"createUser()\">Login</button></ion-content></ion-view>"
  );


  $templateCache.put('app/reportees/reportees.html',
    "<ion-view title=\"My Team\" class=\"backhroundcolor\" cache-view=\"false\" ng-init=\"getUserDetails();\" ng-controller=\"CTRL_reportees as $ctrl\"><ion-header-bar class=\"bar-positive\"><h1 class=\"title\">Help</h1></ion-header-bar><ion-content class=\"padding\"><span ng-if=\"myReportees && myReportees.length > 0\"><span style=\"color: white\"><b>What compliance do you want your team to adhere to?</b></span><br><input type=\"checkbox\" name=\"training\" id=\"training\" ng-change=\"enforceCompliance()\" ng-model=\"$ctrl.training\" ng-checked=\"$ctrl.training\"><label for=\"constraintCheckBoxTraining\" style=\"color: white\"><b>No training pending</b></label><br><input type=\"checkbox\" name=\"phishing\" id=\"phishing\" ng-change=\"enforceCompliance()\" ng-model=\"$ctrl.phishing\" ng-checked=\"$ctrl.phishing\"><label for=\"constraintCheckBoxPhishing\" style=\"color: white\"><b>I didn't click any phishing email.</b></label></span><div class=\"list list-inset searchbox\"><label class=\"item item-input searchboxInput\"><input type=\"text\" placeholder=\"Add a team member\" ng-model=\"$ctrl.newReportee\" ng-keyup=\"checkEnter()\"></label></div><br><button class=\"button button-calm order-button cashBtn\" ng-click=\"addReportee()\">Add to my team</button><div class=\"topSpace\"><ion-item class=\"smallPadding\" ng-repeat=\"reportee in myReportees track by $index\" on-swipe-left=\"deleteReportee({{$index}})\"><div class=\"productDesc\" style=\"height: 55px\"><span class=\"floatingLeftToDo italicBlue\" style=\"line-height: 1.5\"><b>{{reportee}}</b></span></div></ion-item></div></ion-content></ion-view>"
  );

}]);
