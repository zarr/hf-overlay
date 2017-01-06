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
    .directive('olInterviewee', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/ol-interviewee.html'
        };
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
    .directive('olCaster', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/ol-caster.html'
        };
    })
    .controller('ClockController', function($http, socket, $interval) {
        var that = this;
        $interval(updateTime, 500);
        function updateTime() {
            var now = moment();
            that.time = now.format("HH:mm:ss");
            that.timezone = now.format("[UTC]Z");
        }
        socket.on('message', function (msg) {
            if ("clock" == msg.scene) {
                if ("in" == msg.direction) {
                    console.log("clock in");
                    that.in = true;
                } else if ("out" == msg.direction) {
                    console.log("clock out");
                    that.in = false;
                }
            }
        })
    })
    .directive('olClock', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/ol-clock.html'
        };
    })
    .controller('CountdownController', function($http, socket, $interval) {
        var that = this;
        $interval(updateTime, 500);
        function updateTime() {
            var now = moment();
            if (that.targetTime) {
                var hours = that.targetTime.diff(now, 'h');
                var minutes = that.targetTime.diff(now, 'm') % 60;
                var seconds = that.targetTime.diff(now, 's') % 60;
                that.countdown = "";
                if (hours > 0) {
                    that.countdown += hours + ":";
                }
                if (minutes > 0) {
                    that.countdown += minutes + ":";
                }
                if (seconds > 9) {
                    that.countdown += seconds;
                } else if (seconds > 0) {
                    that.countdown += "0" + seconds;
                } else {
                    that.countdown += 0;
                }
            }
        }
        socket.on('message', function (msg) {
            if ("countdown" == msg.scene) {
                if ("in" == msg.direction) {
                    console.log("countdown in");
                    that.targetTime = moment().add(msg.id, 'm');

                    that.in = true;
                } else if ("out" == msg.direction) {
                    console.log("countdown out");
                    that.in = false;
                }
            }
        })
    })
    .directive('olCountdown', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/ol-countdown.html'
        };
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