var Common = require("./scm_browser_common");
var $ = jQuery =require("jquery");

var Client= {

  login: function (user, password, rememberMe, ok, fail) {
    var url=localStorage["baseUrl"]+"api/rest/authentication/login.json";
    var params = {"username":user,
                  "password":password,
                  "rememberMe":rememberMe};
    console.log("launching login");
    $.post(url,params,ok).fail(fail);
  },

  getRepositories: function (ok,fail) {
        var url=localStorage["baseUrl"]+"api/rest/repositories.json";
        $.get(url,ok).fail(fail);

  },

  checkLogin : function(ok,fail) {
    var url=localStorage["baseUrl"]+"api/rest/authentication/state.json";
    $.get(url,ok).fail(fail);
  }
};
module.exports=Client;
