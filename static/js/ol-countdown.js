angular.module('overlayApp')
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
    });