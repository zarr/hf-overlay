angular.module('overlayApp', [])
    .controller('ControlController', function($http, socket) {
        var that = this;
        $http.get('persons').then(function (response) {
            that.persons = response.data;
        });
        that.emit = function (msg, direction, data) {
            console.log('message: ', msg, data);
            socket.emit('message', {
                scene: msg,
                direction: direction,
                id: data
            });
        }
    })
    // I'm copypasta, clean me
    .factory('socket', function ($rootScope) {
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    console.log('got message: ', eventName, args);
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