var page = require('webpage').create();
var address = system.args[1];
/*page.viewportSize = {
  width: system.args[3],
  height: system.args[4]
};*/
page.open(address , function () {
    //page.render(system.args[2]);
    page.render('img.png');
    phantom.exit();
});
