$(function () {
  var isLoggedIn = localStorage.getItem("isLoggedIn");

  console.log(isLoggedIn);
  console.log(isLoggedIn === true);
  if (isLoggedIn === "true") {
    $.get(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",
      function (orders) {
        var ord = orders;
        console.log(ord);
        for (var order of orders) {
          //   console.log(order);
          generateOrderCard(order);
        }
      }
    );

    function generateOrderCard(order) {
      var { id, customerName, amount, orderDate, orderStatus } = order;
      var customerCard = $("<div>").addClass("customer-card");
      var customerId = $("<span>").addClass("customer-id").text(id);
      var customerName = $("<span>")
        .addClass("customer-name")
        .text(customerName);
      var orderDate = $("<span>").addClass("order-date").text(orderDate);
      var orderAmount = $("<span>").addClass("order-amount").text(amount);
      var orderStatus = $("<span>").addClass("order-status").text(orderStatus);

      customerCard.append(
        customerId,
        customerName,
        orderDate,
        orderAmount,
        orderStatus
      );

      $("#right-container").append(customerCard);
    }
    $("#login-btn")[0].style.display = "none";

    // CheckBox
  } else {
    $("#orders-heading")[0].style.display = "none";
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
});
