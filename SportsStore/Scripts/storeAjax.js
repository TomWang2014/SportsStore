//发送ajax请求
var sendRequest = function (url, verb, data, successCallback, errorCallback, options) {
    var requestOptions = options || {};
    requestOptions.type = verb;
    requestOptions.success = successCallback;
    requestOptions.error = errorCallback;
    if (!url || !verb) {
        errorCallback(401, "url and http verb is required!");
    }
    if (data) {
        requestOptions.data = data;
    }
    $.ajax(url, requestOptions);
}

//回调函数
var setDefaultCallback = function (successCallback, errorCallback) {
    $.ajaxSetup({
        complete: function (jqXHR, status) {
            if (jqXHR.status >= 200 && jqXHR.status < 300) {
                successCallback(jqXHR.responseJSON);
            } else {
                errorCallback(jqXHR.status, jqXHR.statusText);
            }
        }
    });
}

//ajax头部设置
var setAjaxHeaders = function (requestHeaders) {
    $.ajaxSetup({ headers: requestHeaders });
}