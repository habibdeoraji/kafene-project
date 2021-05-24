$(function () {
  var isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    $.get(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
      function (users) {
        for (var user of users) {
          generateUserCard(user);
        }
      }
    );

    function generateUserCard(user) {
      var {
        id,
        currentCity,
        currentCountry,
        dob,
        fullName,
        gender,
        profilePic,
      } = user;
      var userCard = $("<div>").addClass("user-card");
      var userId = $("<span>").addClass("user-id").text(id);
      var userFullName = $("<span>").addClass("user-full-name").text(fullName);
      var userDoB = $("<span>").addClass("user-dob").text(dob);
      var userGender = $("<span>").addClass("user-gender").text(gender);
      var userCurrentLocation = $("<span>")
        .addClass("user-current-location")
        .text(currentCity, currentCountry);
      var userAvatar = $("<span>").addClass("user-avatar");
      var userProfilePic = $("<img>")
        .addClass("user-profile-pic")
        .attr("src", profilePic);

      userAvatar.append(userProfilePic);

      userCard.append(
        userId,
        userAvatar,
        userFullName,
        userDoB,
        userGender,
        userCurrentLocation
      );

      $("#second-container").append(userCard);
    }
    $("#login-btn")[0].style.display = "none";
  } else {
    $("#user-heading")[0].style.display = "none";
    $("#main-container")[0].style.display = "none";
    $("#logout-btn")[0].style.display = "none";
  }

  $("#logout-btn").click(function (e) {
    e.preventDefault();
    console.log("Logged out clicked!");
    localStorage.setItem("isLoggedIn", "false");
    location.reload();
  });

  $("#login-btn").click(function (e) {
    e.preventDefault();
    console.log("Login clicked");
    location.assign("./login.html");
  });

  // Search functionality
  $("#search-form").submit(function (e) {
    e.preventDefault();
    var searchString = $("#search-user").val();

    if (searchString.length < 2) {
      alert("Please enter at least 2 characters");
      location.reload();
    } else {
      var userCard = $(".user-card");
      userCard.addClass("display-class");

      $.get(
        `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchString}`,
        function (filteredUsers) {
          for (var user of filteredUsers) {
            generateUserCard(user);
          }
        }
      );
    }
  });

  // Reset Additional functionality
  $("#reset-btn").click(function (e) {
    location.reload();
  });
});
