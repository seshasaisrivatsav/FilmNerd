(function () {
    angular
        .module("FilmNerd")
        .controller("ManageUsersController",ManageUsersController);

    function ManageUsersController(TmdbApiService, $rootScope, $location, $sce, UserService, MovieService) {
        var vm = this;


        vm.createUser = createUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;
        
        function init() {
            getLoggedInUser();
            findAllUsers();
        }
        init();


        function createUser(username, password, admin) {
            var user = {
                username : username,
                password : password,
                admin : admin
            };
          
            UserService
                .createUser(user)
                .then(
                    function (response) {
                        vm.createsuccess = "Created EndUser Successfully";

                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                    vm.userCount = vm.users.length;
                                }
                            );
                    }
                )
        }

        function deleteUser(userId) {
            UserService
                .deleteUser(userId)
                .then(
                    function (response) {
                        vm.warning = "Deleted Successfully!";
                        vm.createsuccess = null;
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                    vm.userCount = vm.users.length;
                                }
                            );
                    }
                )
        }

        function updateUser(userId, user) {

     
            UserService
                .updateUser(userId, user)
                .then(
                    function (response) {
                        vm.updatedmessage = "Updated Successfully!";
                        UserService
                            .findAllUsers()
                            .then(
                                function (response) {
                                    vm.users = response.data;
                                    vm.userCount = vm.users.length;
                                }
                            );
                    }
                );
        }



         function findAllUsers() {
             UserService
                 .findAllUsers()
                 .then(function (response) {
                     vm.users = response.data;
                     vm.userCount = vm.users.length;

                 });
         }

        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }



        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }


    }
})();