(function(){
    angular
        .module("FilmNerd")
        .controller("RegisterController", RegisterController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function RegisterController($location, UserService) {
        var vm = this;
        //vm.createUser = createUser;
        vm.register = register;



        function register(username, password, firstName, lastName, admin) {
            var admin = "false";
            if(vm.myform.$valid == false){
                vm.error = "Enter the username/password";
                vm.alert = "* Enter the fields";
                if(vm.myform.password !== vm.myform.vpassword){
                    vm.pwmatch = "entered passwords do not match!";
                }
            }else {
                UserService
                    .register(username,password, firstName, lastName, admin)
                    .then(function (response) {
                            var user = response.data;
                            if(user){
                                $location.url("/profile");
                            }

                        },
                        function (err) {
                            vm.error = err;
                        });
            }

        }

    }
    
})();