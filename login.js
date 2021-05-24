$(function () {
  console.log("Script loaded!");

  var isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "false" || isLoggedIn == null) {
    $(".logout-btn")[0].style.display = "none";
    $(".login-btn").click(function (e) {
      e.preventDefault();
      var user_name = $(".name-input").val();
      var login_password = $(".password-input").val();
      console.log(user_name, login_password);
      if (user_name === login_password) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login Successful!");
        location.assign("./order.html");
      } else {
        alert("Please enter valid credentials!");
      }
      $(".name-input").val("");
      $(".password-input").val("");
    });
  } else {
    location.assign("./order.html");
  }
});
