var $ = jQuery =require("jquery");
require("bootstrap");
var Common = require("./js/common");
var Client = require("./js/client");
$(function(){
  console.log("starting!");
  $.post(localStorage["baseUrl"]+"api/rest/authentication/login.json",
    {"username":"a511218","password":"0ddS0ck3t!"},
    function(e){console.log(e)})
    .fail(function(e){console.log(e)});



  var goToLogin=function() {
    document.location.href="./login.html";
  }

  var goToMain=function() {
    document.location.href="./main.html";
  }

  if (localStorage["baseUrl"]) {
    Client.checkLogin(goToMain,goToLogin);
  }else{
    goToLogin();
  }
});
