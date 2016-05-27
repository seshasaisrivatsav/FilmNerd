(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    
    function ProfileController($routeParams) {
        var vm = this;
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var uid = $routeParams.uid;

        for (var i in users){
            if(users[i]._id === uid){
                vm.user = users[i];
            }
        }


    }


})();