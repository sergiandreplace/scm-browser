var Common = require("./js/scm_browser_common");
var $ = jQuery =require("jquery");
require("bootstrap");
var Client = require("./js/scm_browser_client");

$(function(){

  var reposList=$("#reposList");
  var searchRepo=$("#searchRepo");
  var repos, visibleRepos=[];

  var errorRepositories=function() {

  }
  function compareRepos(a,b) {
    if (a.name.toLowerCase() < b.name.toLowerCase())
      return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase())
      return 1;
    return 0;
  }
  var drawRepositories=function(data) {
    repos=data;

    repos.sort(compareRepos);

    for (i=0;i<repos.length;i++) {
      reposList.append('<li class="repoItem" id="'+i+'"><a alt="'+data[i].name+'"" href="">'+data[i].name+'</a></li>');
    }
    $(".repoItem").click(function() {
      console.log(repos[$(this)[0].id]);
    });
  };

  var filterRepos=function() {
    var filter=searchRepo.val();
      $(".repoItem").each(function(){
        if (repos[$(this)[0].id].name.indexOf(filter)>-1) {
          $(this).show();
        }else{
          $(this).hide();
        }
      });

  };

  var loadRepos=function() {
    Client.getRepositories(drawRepositories, errorRepositories);
  };
  searchRepo.on('input',filterRepos);

  loadRepos();

});
