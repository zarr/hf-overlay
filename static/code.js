angular.module('overlayApp', [])
    .controller('IntervieweeController', function($http, socket) {
        var interviewee = this;
        interviewee.interviewee = {
            name: "Mikko",
            title: "Happy coder"
        };
        interviewee.enter = function () {
            interviewee.in = !interviewee.in;
        };
        socket.on('message', function (msg) {
            if ("interview" == msg.scene) {
                console.log("show id ", msg.id);
                $http.get('person/' + msg.id).success(function (data, status, headers) {
                    interviewee.interviewee = data;
                });
                interviewee.enter();
            }
        })
    })
    .controller('CasterController', function($http, socket) {
        var caster = this;
        caster.caster1 = {
            name: "Matti Mainio",
            nick: "MasaHyper",
            tag: "#masahyper"
        }
        caster.caster2 = {
            name: "Miisa Mainio",
            nick: "MisseSuper",
            tag: "#missesuper"
        }
        caster.enter = function () {
            caster.in = !caster.in;
        }
        socket.on('message', function (msg) {
            if ("casters" == msg.scene) {
                console.log("caster ids ", msg.id.caster1, msg.id.caster2);
                $http.get('person/' + msg.id.caster1).success(function (data, status, headers) {
                    caster.caster1 = data;
                });
                $http.get('person/' + msg.id.caster2).success(function (data, status, headers) {
                    caster.caster2 = data;
                });
                caster.enter();
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