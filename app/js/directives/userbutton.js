angular.module("userButtonDirective",[])
/*
.directive('userbutton', function($rootScope) {
  return {
    restrict:'E',
    compile: function(element) {
      if($rootScope.user===0) {
        element.replaceWith('<li><a href="#" id="login-modal-toggle" data-toggle="modal" data-target="#loginModal">Login</a></li>');
      } else {
        element.replaceWith('<li><a href="#">'+ $rootScope.user.username +'</a></li>');
      }
    }
  }
});*/

.directive('userbutton', function ($compile,$rootScope) {
  return {
    restrict: 'E',
    link: function (scope, element, attr) {
      var template1 = '<li><a href="#" id="login-modal-toggle"'+
                      ' data-toggle="modal" data-target="#loginModal">Login</a></li>';
                      
      var newElem;
      $rootScope.$watch('user', function (val) {
        if (val==0) {
          newElem = angular.element(template1);
          $(element).replaceWith(newElem).show();
          $compile($('#login-modal-toggle'))(scope);
        } else {
          var template2 = '<li class="dropdown">'+
                      '<a href="#" class="dropdown-toggle" data-toggle="dropdown" '+
                      'role="button" aria-expanded="false">'+val.local.username+'<span class="caret"></span></a>'+
                      '<ul class="dropdown-menu" role="menu">'+
                        '<li><a href="#">Action</a></li>'+
                        '<li><a href="#">Another action</a></li>'+
                        '<li><a href="#">Something else here</a></li>'+
                        '<li class="divider"></li>'+
                        '<li><a href="/logout">Logout</a></li></ul></li>'
          

          if(newElem==null) {
            newElem = angular.element(template2);
            element.replaceWith(newElem);
          } else {
            newElem.replaceWith(template2);
          }
        }
      });
    }
  }
});
