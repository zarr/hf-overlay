angular.module('overlayApp', [])
    .controller('IntervieweeController', function() {
        var intervieweeData = this;
        intervieweeData.interviewee = {
            name: "Mikko",
            title: "Happy coder"
        }
    });