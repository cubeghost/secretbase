var page = require('webpage').create();
/*page.viewportSize = {
  width: 352,
  height: 288
};*/
phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit(1);
};
page.open('http://secret-base.herokuapp.com/file.html', function() {
    /*page.onResourceRequested = function (request) {
        console.log('Request ' + JSON.stringify(request, undefined, 4));
    };*/
    window.setTimeout(function () {
        console.log('page opened');
        page.render('base.png',function(){
            console.log('base.png saved');
        });
        phantom.exit();
        
    }, 400);
});