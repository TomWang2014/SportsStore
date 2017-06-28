﻿var authenticateUrl = "/Authenticate";
//身份验证
var authenticate = function (successCallback) {
    sendRequest(authenticateUrl, "POST", {
        "grant_type": "password", username: model.username(), password: model.password()
    }, function (data) {
        model.authenticated(true);       
        setAjaxHeaders({
            Authorization: "bearer " + data.access_token
        });
        if (successCallback) {
            successCallback();
        }
    });
};
