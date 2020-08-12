

function renderProduct(item, i) {
  var jsonObj = item.data();

  var content = "<div class='col-md-4 product-grid'>" +
    "  <div class='image'>" +
    "    <a href='#'>" +
    "       <img src='" + jsonObj.url + "'class='w-100' id='productImage" + i + "'>" +
    "       <div class='overlay'>" +
    "          <div class='detail'>View Details</div>" +
    "       </div>" +
    "    </a>" +
    "  </div>" +
    "  <h5 class='text-center' id='productName" + i + "'>" + jsonObj.productName + "</h5>" +
    "  <h5 class='text-center' id='price" + i + "'>" + formatStringToCurrency(jsonObj.price) + "</h5>" +
    "  <a href='#' class='btn buy'>BUY</a>" +
    "</div>"
  $("#productList").append(content);
}

function formatStringToCurrency(stringCurrency) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: "currency",
    currency: "USD",
  });
  var currency = formatter.format(stringCurrency)
  return currency;

}

function loadProductList() {
  db.collection("product/8WS85RRBzV60Z1jBYDsd/electronics").get().then((snapshot) => {
    snapshot.docs.forEach((item, i) => {
      renderProduct(item, i)
    });
  });
}

function refreshProductList() {
  $("#productList").load(" #productList > *");
}
