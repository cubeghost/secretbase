var page = require('webpage').create();
var address = system.args[1];
page.viewportSize = {
  width: system.args[2],
  height: system.args[3]
};
page.open(address , function () {
    page.render('base.png');
    phantom.exit();
});
