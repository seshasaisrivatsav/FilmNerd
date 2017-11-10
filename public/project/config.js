// (function () {
//     angular
//         .module("FilmNerd")
//         .config(Config);
//
//     function Config($routeProvider) {
//         $routeProvider
//
//
//             // .when("/adminconsole", {
//             //     templateUrl: "views/admin/admin-console.view.client.html",
//             //     controller: "AdminConsoleController",
//             //     controllerAs: "model",
//             //     resolve: {
//             //         loggedIn: checkLoggedIn
//             //     }
//             // })
//
//             .when("/admin",{
//                 templateUrl: "views/admin/create-admin.view.client.html"
//             })
//
//             .when("/managemovies",{
//                 templateUrl: "views/admin/manage-movies.view.client.html",
//                 controller: "ManageMoviesController",
//                 controllerAs: "model",
//                 resolve :{
//                     loggedIn: checkLoggedIn
//                 }
//             })
//             .when("/manageusers",{
//                 templateUrl: "views/admin/manage-users.view.client.html",
//                 controller: "ManageUsersController",
//                 controllerAs: "model",
//                 resolve :{
//                     loggedIn: checkLoggedIn
//                 }
//             })
//             .when("/manageflaggedreviews",{
//                 templateUrl: "views/admin/admin-flaggedreviews.view.client.html",
//                 controller: "AdminFlaggedReviewsController",
//                 controllerAs: "model",
//                 resolve :{
//                     loggedIn: checkLoggedIn
//                 }
//             })
//
//             .when("/adminconsole",{
//                 templateUrl: "views/admin/admin-console.view.client.html",
//                 controller: "AdminConsoleController",
//                 controllerAs: "model",
//                 resolve :{
//                     loggedIn: checkLoggedIn
//                 }
//             })
//
//
//             .when("/movie/:id/review",{
//                 templateUrl: "views/main/movie-review.view.client.html",
//                 controller: "MovieReviewController",
//                 controllerAs: "model",
//                 resolve: {
//                     loggedIn: checkLoggedIn
//                 }
//
//             })
//
//             .when("/cast/:id", {
//                 templateUrl: "views/main/cast-info.view.client.html",
//                 controller: "CastController",
//                 controllerAs: "model"
//             })
//
//
//             .when("/movie/:id",{
//                 templateUrl: "views/main/movie-info.view.client.html",
//                 controller: "MovieInfoController",
//                 controllerAs: "model",
//                 resolve :{
//                     freeView : freeView
//                 }
//             })
//
//
//             .when("/moviedefault",{
//                 templateUrl : "views/main/movie-default.view.client.html",
//                 controller: "movieDefaultController",
//                 controllerAs: "model",
//                 resolve : {
//                     freeView: freeView
//                 }
//             })
//
//             .when("/user/profile/:username",{
//                 templateUrl : "views/user/user-profile.view.client.html",
//                 controller: "UserProfileController",
//                 controllerAs: "model",
//                 resolve:{
//                     freeView : freeView
//                 }
//             })
//
//             .when("/profile",{
//                 templateUrl: "views/user/profile.view.client.html",
//                 controller : "ProfileController",
//                 controllerAs: "model" ,
//                 resolve: {
//                     loggedIn: checkLoggedIn
//                 }
//             })
//
//             .when("/editprofile",{
//                 templateUrl: "views/user/profile-edit.view.client.html",
//                 controller : "ProfileEditController",
//                 controllerAs: "model" ,
//                 resolve: {
//                     loggedIn: checkLoggedIn
//                 }
//             })
//             .when("/register",{
//                 templateUrl: "views/user/register.view.client.html",
//                 controller : "RegisterController",
//                 controllerAs: "model",
//                 resolve : {
//                     freeView : freeView
//                 }
//             })
//
//             .when("/login",{
//                 templateUrl: "views/user/login.view.client.html",
//                 controller: "LoginController",
//                 controllerAs : "model",
//                 resolve : {
//                     freeView : freeView
//                 }
//             })
//
//             .when("/search/:movieName",{
//                 templateUrl: "views/main/search.view.client.html",
//                 controller: "searchController",
//                 controllerAs: "model",
//                 resolve : {
//                     freeView : freeView
//                 }
//             })
//
//             .when("/home", {
//                 templateUrl: "views/user/home.view.client.html"
//             })
//             .otherwise({
//             templateUrl: "views/user/home.view.client.html"
//         });
//
//         function checkLoggedIn(UserService, $location, $q, $rootScope) {
//             //deferred obj has promise
//             var deferred = $q.defer();
//             UserService
//                 .loggedIn()
//                 .then(function (response) {
//                     var user = response.data;
//                     if(user=='0'){
//                         $rootScope.currentUser = null;
//                         deferred.reject();
//                         $location.url("/login");
//                     }else{
//                         $rootScope.currentUser = user;
//                         deferred.resolve();
//                     }
//                 },function (err) {
//                     $location.url("/login");
//                 });
//
//             return deferred.promise;
//         }
//
//         function freeView (UserService, $location, $q, $rootScope) {
//             var deferred = $q.defer();
//             UserService
//                 .loggedIn()
//                 .then(
//                     function (response) {
//                         var user = response.data;
//                         if(user == '0'){
//                             deferred.resolve();
//                         } else {
//                             $rootScope.currentUser = user;
//                             deferred.resolve();
//                         }
//                     },
//                     function (err) {
//                         $location.url("/login");
//                     }
//                 );
//             return deferred.promise;
//         }
//     }
// })();