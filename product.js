$(function () {
  var isLoggedIn = localStorage.getItem("isLoggedIn");

  console.log(isLoggedIn);
  console.log(isLoggedIn === true);
  if (isLoggedIn === "true") {
    $.get(
      "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",
      function (products) {
        var productsArray = products;
        $("#current-count").text(productsArray.length);

        console.log(products);
        for (var product of products) {
          generateProductCard(product);
        }

        // Filter Products
        var checkedArray = productsArray;
        $(".filter").change(function (elem) {
          $(".product-card").hide();

          var monthObj = {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11,
          };
          if (!elem.target.checked) {
            checkedArray = checkedArray.filter(function (element) {
              if (elem.target.name == "LowStock") {
                return element.stock > 100;
              } else {
                var d = new Date();
                var ed = element.expiryDate;
                var edMonth = monthObj[ed.slice(3, 6)];

                if (
                  d.getFullYear() < ed.slice(7) ||
                  (d.getFullYear() == ed.slice(7) &&
                    d.getMonth() < edMonth) ||
                  (d.getFullYear() == ed.slice(7) &&
                    d.getMonth() == edMonth &&
                    d.getDate() < ed.slice(0, 2))
                ) {
                  return ed;
                }
              }
            });
          } else {
            var newCheckedArray = productsArray.filter(function (el) {
              if (elem.target.name == "LowStock") {
                return el.stock < 100;
              } else {
                var d = new Date();
                var ed = el.expiryDate;
                var edMonth = monthObj[ed.slice(3, 6)];

                if (
                  d.getFullYear() > ed.slice(7) ||
                  (d.getFullYear() == ed.slice(7) &&
                    d.getMonth() > edMonth) ||
                  (d.getFullYear() == ed.slice(7) &&
                    d.getMonth() == edMonth &&
                    d.getDate() > ed.slice(0, 2))
                ) {
                  console.log(ed);
                  return ed;
                }
              }
            });
            checkedArray = checkedArray.concat(newCheckedArray);
          }
          $("#current-count").text(checkedArray.length <= productsArray.length ? checkedArray.length : productsArray.length);


          for (var order of checkedArray) {
            generateProductCard(order);
          }
          console.log(checkedArray);
        });
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



  // Active Class in nav menu

  $('.topbar-menu').removeClass("active");
  $('.products').addClass("topbar-menu products active")
});
