angular.module('overlayApp', [])
    .controller('CrudController', function($http) {
        var that = this;
        $http.get('persons').success(function (data, status, headers) {
            that.persons = data;
        });
        that.addPerson = function(newPerson) {
            console.log("add person ", newPerson);
            $http.post('persons', newPerson).success(function (data, status, headers) {
                console.log("successfully added!")
            });
        }
    });