(function()
{
  angular
    .module("MovieJourney")
    .config(Config);

  function Config($routeProvider)
  {
    $routeProvider
      .when("/home",
      {
        templateUrl: "views/home/home.view.html",
      })
       .when("/login",
      {
        templateUrl: "views/login/login.view.html",
        controller: "LoginController"
      })
       .when("/logout",
      {
        templateUrl: "views/logout/logout.view.html",
        controller: "LogoutController"
      })
      .when("/register", {
          templateUrl: "views/register/register.view.html",
          controller: "RegisterController"
      })
      .when("/profile",
      {
        templateUrl: "views/profile/profile.view.html",
        controller: "ProfileController"
      })
      .when("/movie",
      {
        templateUrl: "views/movie/movie.view.html",
        controller: "MovieController"
      })
       .when("/moviedetail",
      {
        templateUrl: "views/moviedetail/moviedetail.view.html",
        controller: "MovieDetailController"
      })
      .when("/watchlist",
      {
        templateUrl: "views/watchlist/watchlist.view.html",
        controller: "WatchlistController"
      })
      .when("/order",
      {
        templateUrl: "views/order/order.view.html",
        controller: "OrderController"
      })
      .when("/friend",
      {
        templateUrl: "views/friend/friend.view.html",
        controller: "FriendController"
      })
      .otherwise({
        redirectTo: "/home"
      })
  }
})();