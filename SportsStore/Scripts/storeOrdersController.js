var ordersUrl = "/nonrest/Order/";
var orderListUrl = ordersUrl + "list";
var orderCreateUrl = ordersUrl + "CreateOrder/";
var orderDeleteUrl = ordersUrl + "DeleteOrder/";

//获取订单列表
var getOrders = function () {
    sendRequest(orderListUrl, "GET", null, function (data) {
        model.orders.removeAll();
        model.orders.push.apply(model.orders, data);
    });
}
//删除订单
var deleteOrder = function (id) {
    sendRequest(orderDeleteUrl + id, "delete", null, function () {
        model.orders.remove(function (item) {
            return item.Id = id;
        })
    });
}
//添加/修改 订单
var saveOrder = function (order, successCallback) {
    sendRequest(orderCreateUrl, "POST", order, function () {
        getOrders();
        if (successCallback) {       
            successCallback();
        }
    });
}