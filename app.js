
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , stylus = require('stylus')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(stylus.middleware({
    src: __dirname + '/views'
    // It will add /stylesheets to this path.
  , dest: __dirname + '/public'
}));

// host dev files if in dev mode
if (app.get('env') === 'development') {
    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.static(path.join(__dirname, '.tmp')));
} else {
    app.use(express.static(path.join(__dirname, 'dist')));
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
