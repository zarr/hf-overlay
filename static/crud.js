angular.module('overlayApp', [])
    .controller('CrudController', function($http) {
        var that = this;
        that.loadPersons = function() {
            $http.get('persons').success(function (data, status, headers) {
                that.persons = data;
            });
        };
        that.addPerson = function(newPerson) {
            console.log("add person ", newPerson);
            $http.post('persons', newPerson).success(function (data, status, headers) {
                console.log("successfully added!");
                that.loadPersons();
            });
        };
        that.deletePerson = function(id) {
            console.log("delete person ", id);
            $http.delete('person/' + id).success(function (data, status, headers) {
                console.log("successfully deleted!");
                that.loadPersons();
            });
        };
        that.loadPersons();
    });