angular.module('overlayApp', [])
    .controller('IntervieweeController', function($http, socket) {
        var interviewee = this;
        socket.on('message', function (msg) {
            if ("interview" == msg.scene) {
                if ("in" == msg.direction) {
                    console.log("show id ", msg.id);
                    $http.get('person/' + msg.id).success(function (data, status, headers) {
                        interviewee.interviewee = data;
                    });
                    interviewee.in = true;
                } else if ("out" == msg.direction) {
                    interviewee.in = false;
                }
            }
        })
    })
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
    .factory('socket', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    console.log('got message: ', eventName, ' arguments: ', args);
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
});