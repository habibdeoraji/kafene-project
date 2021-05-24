$(function () {
  var isLoggedIn = localStorage.getItem("isLoggedIn");

  console.log(isLoggedIn);
  console.log(isLoggedIn === true);
  if (isLoggedIn === "true") {
    $.get(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
      function (products) {
        console.log(products);
        for (var product of products) {
          //   console.log(order);
          generateProductCard(product);
        }
      }
    );

    function generateProductCard(product) {
      var {
        id,
        medicineName,
        expiryDate,
        medicineBrand,
        unitPrice,
        stock,
      } = product;
      var productCard = $("<div>").addClass("product-card");
      var productId = $("<span>").addClass("product-id").text(id);
      var productName = $("<span>").addClass("product-name").text(medicineName);
      var productBrand = $("<span>")
        .addClass("product-brand")
        .text(medicineBrand);
      var expiryDate = $("<span>").addClass("expiry-date").text(expiryDate);
      var unitPrice = $("<span>").addClass("unit-price").text(unitPrice);
      var stock = $("<span>").addClass("stock").text(stock);

      productCard.append(
        productId,
        productName,
        productBrand,
        expiryDate,
        unitPrice,
        stock
      );

      $("#right-container").append(productCard);
    }
    $("#login-btn")[0].style.display = "none";
  } else {
    $("#product-heading")[0].style.display = "none";
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
