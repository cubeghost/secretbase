var system = require('system');
var page = require('webpage').create();
var address = 'http://secret-base.herokuapp.com/file.html';
/*page.viewportSize = {
  width: system.args[3],
  height: system.args[4]
};*/
page.onLoadFinished = function(status) {
  var url = page.url;
  console.log("Status:  " + status);
  console.log("Loaded:  " + url);
  page.render("google.png");
  phantom.exit();
};

page.open(address , function () {
    //page.render(system.args[2]);
    page.render('img.png');
    phantom.exit();
});
