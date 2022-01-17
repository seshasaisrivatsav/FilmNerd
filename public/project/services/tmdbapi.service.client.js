(function () {
    angular
        .module("FilmNerd")
        .factory("TmdbApiService", TmdbApiService);
    
    function TmdbApiService($http, $q) {
        var api ={
            searchMovies: searchMovies,
            getGenres: getGenres,
            getNowPlaying: getNowPlaying,
            getUpcomingMovies: getUpcomingMovies,
            findMovieByID: findMovieByID,
            findCastByID: findCastByID
        };

        /* API Info */
        var apikey = "4f2d1f1b0b040f028fe607fa054b6762";
        var baseUrl = "https://api.themoviedb.org/3";
        return api;

        /* API Feature Functions */

        function getGenres() {
            var url = baseUrl + '/genre/movie/list?api_key=' + apikey;
            return $http.get(url);
        }

        function searchMovies(searchText) {
            var moviesSearchUrl = baseUrl + '/search/movie?api_key=' + apikey + '&query=' + searchText + '&language=en&include_adult=false';
            return $http.get(moviesSearchUrl);
        }

        function getNowPlaying() {
            var url = baseUrl + '/movie/now_playing?api_key=' + apikey;
            return $http.get(url);
        }

        function getUpcomingMovies() {
            const url = baseUrl + '/movie/upcoming?api_key=' + apikey;
            return $http.get(url);
        }

        function findMovieByID(id, callback) {
            const appendTags = 'videos,credits,reviews';
            $http.get(baseUrl + '/movie/' + id + '?api_key=' + apikey + '&append_to_response=' + appendTags)
                .success(callback);
        }

        function findCastByID(id, callback) {
            const appendTags = 'movie_credits';
            $http.get(baseUrl + '/person/' + id + '?api_key=' + apikey + '&append_to_response=' + appendTags)
                .success(callback);
        }


    }
    
})();