var page = require('webpage').create();
page.viewportSize = {
  width: 352,
  height: 288
};
page.open('http://secret-base.herokuapp.com/file.html', function() {
    page.onResourceRequested = function (request) {
        console.log('Request ' + JSON.stringify(request, undefined, 4));
    };
  page.render('base.png');
  phantom.exit();
});
