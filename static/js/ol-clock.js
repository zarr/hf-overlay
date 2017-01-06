angular.module('overlayApp')
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
    });