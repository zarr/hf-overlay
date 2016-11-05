angular.module('overlayApp', [])
    .controller('IntervieweeController', function() {
        var interviewee = this;
        interviewee.interviewee = {
            name: "Mikko",
            title: "Happy coder"
        }
        interviewee.enter = function () {
            interviewee.in = !interviewee.in;
        }
    })
    .controller('CasterController', function() {
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
    });