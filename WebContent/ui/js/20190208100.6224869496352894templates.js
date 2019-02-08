angular.module('starter').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('tabs.html',
    "<ion-tabs class=\"tabs-positive tabs-icon-bottom\"><ion-tab title=\"Reminder\" icon-on=\"ion-ios-bell\" icon-off=\"ion-ios-bell\" href=\"#/menu/tab/home\"><ion-nav-view name=\"tab-home\"></ion-nav-view></ion-tab><ion-tab title=\"ToDo\" icon-on=\"icon ion-android-checkbox-outline\" icon-off=\"icon ion-android-checkbox-outline\" href=\"#/menu/tab/todo\"><ion-nav-view name=\"tab-todo\"></ion-nav-view></ion-tab></ion-tabs>"
  );


  $templateCache.put('menu.html',
    "<ion-view><ion-side-menus><ion-side-menu-content ng-controller=\"CTRL_help as $ctrl\"><ion-nav-bar class=\"bar-positive\"><ion-nav-back-button class=\"button-icon ion-arrow-left-c\"></ion-nav-back-button><ion-nav-buttons side=\"left\"><button class=\"button button-icon button-clear ion-navicon\" ng-click=\"showMenu()\"></button></ion-nav-buttons></ion-nav-bar><ion-nav-view animation=\"slide-left-right\"></ion-nav-view></ion-side-menu-content><ion-side-menu side=\"left\"><ion-header-bar class=\"bar bar-header bar-positive\"><h1 class=\"title\">Profile</h1></ion-header-bar><ion-content has-header=\"true\" class=\"custom\"><ion-list><ion-item nav-clear menu-close href=\"#menu/tab/home\"><i class=\"icon ion-android-home\"></i> Home <i class=\"ion-ios-arrow-forward pull-right\"></i></ion-item><ion-item nav-clear menu-close href=\"#menu/help\"><i class=\"icon ion-android-happy\"></i> FAQ <i class=\"ion-ios-arrow-forward pull-right\"></i></ion-item></ion-list></ion-content></ion-side-menu></ion-side-menus></ion-view>"
  );


  $templateCache.put('app/help/help.html',
    "<ion-view title=\"Help\" class=\"backhroundcolor\" cache-view=\"false\" ng-controller=\"CTRL_help as $ctrl\"><ion-header-bar class=\"bar-positive\"><h1 class=\"title\">Help</h1></ion-header-bar><ion-content class=\"padding\"><span class=\"whitecolor\"><div class=\"topSpace\"><ion-item class=\"smallPadding\"><div class=\"productDesc\"><span class=\"italicGreen\">&#8226; Help</span></div></ion-item></div></span></ion-content></ion-view>"
  );


  $templateCache.put('app/home/home.html',
    "<ion-view title=\"Home\" cache-view=\"false\" class=\"backhroundcolor\" ng-init=\"callCxf();\" ng-controller=\"CTRL_HOME as $ctrl\"><ion-header-bar class=\"bar-positive\"><h1 class=\"title\">Home</h1></ion-header-bar><ion-content class=\"padding\"><div><span class=\"userName blockDisplay\">{{cxfResult}}</span></div></ion-content></ion-view>"
  );


  $templateCache.put('app/home/todo/todo.html',
    "<ion-view title=\"ToDo\" cache-view=\"false\" class=\"backhroundcolor\" ng-init=\"\" ng-controller=\"CTRL_TODO as $ctrl\"><ion-header-bar class=\"bar-positive\"><h1 class=\"title\">ToDO</h1></ion-header-bar><ion-content class=\"padding\"><div><span class=\"userName blockDisplay\">ToDo</span></div></ion-content></ion-view>"
  );

}]);
