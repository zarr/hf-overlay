angular.module('overlayApp')
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
    });