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

//监视商品变化
model.products.subscribe(function (newProducts) {
    filterProductsByCategory();
    customerModel.productCategories.removeAll();
    customerModel.productCategories.push.apply(customerModel.productCategories,
        model.products().map(function (p) {
            return p.Category;
        })
            .filter(function (value, index, self) {
                return self.indexOf(value) === index;
            }).sort());
});
//监视购物车变化
customerModel.cart.subscribe(function (newCart) {
    customerModel.cartTotal(newCart.reduce(
        function (prev, item) {
            return prev + (item.count * item.product.Price);
        }, 0));
    customerModel.cartCount(newCart.reduce(
        function (prev, item) {
            return prev + item.count;
        }, 0));
});

//根据类别筛选商品
var filterProductsByCategory = function () {
    var category = customerModel.selectedCategory();
    customerModel.filteredProducts.removeAll();
    customerModel.filteredProducts.push.apply(customerModel.filteredProducts,
        model.products().filter(function (p) {
            return category == null || p.Category == category;
        }));
}

$(document).ready(function () {
    getProducts();
});



