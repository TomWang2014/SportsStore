var productUrl = "/api/products/";
//获取商品列表
var getProducts = function () {
    sendRequest(productUrl, "Get", null, function (data) {
        model.products.removeAll();
        model.products.push.apply(model.products, data);
    });
}
//删除商品列表
var deleteProduct = function (id) {
    sendRequest(productUrl + id, "Delete", null, function () {
        model.products.remove(function (item) {
            return item.Id = id;
        })
    });
}

//保存商品列表
var saveProduct = function (product, successCallback) {
    sendRequest(productUrl, "POST", product, function () {
        getProducts();
        if (successCallback) {
            successCallback();
        }
    })
}