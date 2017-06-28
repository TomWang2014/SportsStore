var setCategory = function (category) {
    //选择类别
    customerModel.selectedCategory(category);
    //根据类别筛选商品
    filterProductsByCategory();
}

//选择视图
var setView = function (view) {
    customerModel.currentView(view);
}

//将商品添加到购物车
var addToCart = function (product) {
    var found = false;
    var cart = customerModel.cart();
    for (var i = 0; i < cart.length; i++) {
        if (card[i].product.Id = product.Id) {
            found = true;
            var count = cart[i].count + 1;
            customerModel.cart.splice(i, 1);
            customerModel.cart.push({ count: count, product: product });
            break;
        }
    }
    if (!found) {
        customerModel.cart.push({ count: 1, product: product });
    }

    setView("cart");
}

//从购物车中移除商品
var removeFromCart = function (productSelection) {
    customerModel.cart.remove(productSelection);
}

var placeOrder = function () {
    var order = {
        Customer: model.username(),
        Lines: customerModel.cart().map(function (item) {
            return {
                Count: item.count,
                ProductId: item.product.Id
            }
        })
    }
    saveOrder(order, function () {
        setView("thankyou");
    });
}



