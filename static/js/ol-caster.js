angular.module('overlayApp')
    .controller('CasterController', function($http, socket) {
        var caster = this;
        socket.on('message', function (msg) {
            if ("casters" == msg.scene) {
                if ("in" == msg.direction) {
                    console.log("caster ids ", msg.id.caster1, msg.id.caster2);
                    $http.get('person/' + msg.id.caster1).success(function (data, status, headers) {
                        caster.caster1 = data;
                    });
                    $http.get('person/' + msg.id.caster2).success(function (data, status, headers) {
                        caster.caster2 = data;
                    });
                    caster.in = true;
                } else if ("out" == msg.direction) {
                    caster.in = false;
                }
            }
        })
    })
    .directive('olCaster', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/ol-caster.html'
        };
    });
