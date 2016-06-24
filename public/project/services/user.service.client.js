(function(){
    angular
        .module("FilmNerd")
        .factory("UserService", UserService);




    function UserService($http) {
        /* provide an API that allows access to this thing */
        var api = {
            loggedIn: loggedIn,
            createUser: createUser,
            register: register,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            findUserByUsername: findUserByUsername,
            submitRatingReview : submitRatingReview

        };

        return api;
        /*functions are implemented below*/

        function submitRatingReview(userId,rateandreview) {
            var url = "/api/project/"+userId+"/rateandreview";
            return $http.put (url, rateandreview);
        }


        function register(username,password, firstName, lastName, admin) {
            var user= {
                username: username,
                password : password,
                firstName: firstName,
                lastName: lastName,
                admin : admin
            };
            return $http.post("/api/project/register",user);

        }


        function loggedIn() {
            return $http.get("/api/project/loggedIn");
        }
        function logout() {
            return $http.post("/api/project/logout" );
        }
        function login(username, password) {
            var user ={
                username: username,
                password: password
            };
            return $http.post("/api/project/login", user);

        }
        function findUserByCredentials(username, password){

            var url = "/api/project/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function createUser(user) {
            var url = "/api/project/user";
            return $http.post(url,user);

        }

        function findUserById(userId) {
            var url = "/api/project/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url ="/api/project/user?username="+username;
            return $http.get(url);

        }



        function updateUser(userId, user){
            var url="/api/project/user/"+userId;
            return $http.put(url, user);


        }


        function deleteUser(userId){
            var url = "/api/project/user/"+userId;
            return $http.delete(url);

        }

    }
})();