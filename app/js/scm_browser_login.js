var Common = require("./js/scm_browser_common");
var $ = jQuery =require("jquery");
require("bootstrap");
var Client = require("./js/scm_browser_client");

$(function(){




  var inputServer = $("#inputServer");
  var inputUser = $("#inputUser");
  var inputPassword = $("#inputPassword");
  var inputRememberMe = $("#inputRememberMe");
  var loginButton = $("#loginButton");
  var loginForm = $("#inputLoginForm");
  var errorMessage=$("#errorMessage");


  var setupForm=function() {
    $("#loginForm").css("margin-top", Math.max(0, ($(window).height() - $("#loginForm").height()) / 3));

  }

   // Reposition when the window is resized
   $(window).on('resize', function() {
      setupForm();
   });




  var isLoginReady =function () {
    return inputServer.val().trim().length && inputUser.val().trim().length && inputPassword.val().trim().length;
  }

  var setLoginButtonStatus = function () {
    if (isLoginReady()) {
      loginButton.removeClass("disabled");
    }else{
      loginButton.addClass("disabled");
    }
  };

  var recoverUser=function () {

    inputUser.val(localStorage["user"]);
    inputServer.val(localStorage["baseUrl"]);
    inputRememberMe.prop("checked",localStorage["rememberMe"]);




  };

  var goToMain = function() {
    document.location.href="./main.html";
  }

  var onLoginConnect = function (data) {
    console.log("login ok");

    localStorage["rememberMe"]=inputRememberMe.prop("checked");
    localStorage["user"] = inputUser.val();
    $("#loginContainer").show();
    $("#waitSpinner").hide();
    goToMain();
  }

  var onLoginFail = function (e) {
    console.log("login wrong");
    console.log(e);
    $("#loginContainer").show();
    $("#waitSpinner").hide();
    errorMessage.show();
  }

  loginForm.submit(function() {

    if (isLoginReady()) {
      errorMessage.hide();
      $("#loginContainer").hide();
      $("#waitSpinner").show();
      var baseUrl=inputServer.val();
      baseUrl=baseUrl+(baseUrl.endsWith("/")?"":"/");
      localStorage["baseUrl"]=baseUrl;
      console.log(baseUrl);

      Client.login(inputUser.val(),inputPassword.val(),
                  inputRememberMe.prop("checked"),
                  onLoginConnect,onLoginFail);
    }
    return false;
  });



  //Start!
  inputServer.on('input',setLoginButtonStatus);
  inputUser.on('input',setLoginButtonStatus);
  inputPassword.on('input',setLoginButtonStatus);
  setLoginButtonStatus();
  recoverUser();
  setupForm();



});
