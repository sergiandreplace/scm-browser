var Common = require("./js/common");
var $ = jQuery =require("jquery");
require("bootstrap");
var Client = require("./js/client");
var repoList = require("./js/main_repolist");
$(function() {


  var onRepoSelected=function(id) {
    console.log("selected: "+ id);
  }

  repoList.setOnRepoSelected(onRepoSelected);



});
