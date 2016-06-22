(function(){
    angular
        .module("FilmNerd")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService){

        var vm = this;

        vm.login = function (username, password) {

            if(vm.myform.$valid == false){
                vm.error = "Enter the username/password";
                vm.alert = "* Enter the required fields";
            }else{
                UserService
                    .login(username, password)
                    .then(function (response) {

                        var user = response.data;

                        if (user._id){
                            $location.url("/profile");
                        } else {
                            vm.error = response.data;
                        }
                    });
            }
        }

    }

})();

