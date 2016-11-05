angular.module('overlayApp', [])
    .controller('IntervieweeController', function(socket) {
        var interviewee = this;
        interviewee.interviewee = {
            name: "Mikko",
            title: "Happy coder"
        };
        interviewee.enter = function () {
            interviewee.in = !interviewee.in;
        };
        socket.on('message', function (msg) {
            if ("interview" == msg) {
                interviewee.enter();
            }
        })
    })
    .controller('CasterController', function(socket) {
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
            if ("casters" == msg) {
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