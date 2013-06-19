/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , mongoose = require('mongoose')
  , RedisStore = require('connect-redis')(express)
  , db = mongoose.createConnection('localhost', 'myapp')
  , colors = require('colors');

// route vars
var home = require('./server/api/home'),
    pages = require('./server/api/pages');

// csrf token
var csrfValue = function (req) {
    var token = (req.body && req.body._csrf)
        || (req.query && req.query._csrf)
        || (req.headers['x-csrf-token'])
        || (req.headers['x-xsrf-token']);
    return token;
};

// all environments
app.set('port', process.env.PORT || 9000);
app.set('views', __dirname + '/client');
app.set('view engine', 'jade');
app.locals.pretty = true;
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({
    store: new RedisStore,
    secret: 'hdy72by3s8su28js2uk9ie90u2389d23rytg4710yj18d14678239s470'
}));
app.use(express.csrf({value: csrfValue}));
app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.session._csrf);
    next();
});
app.use(app.router);

// host dev files if in dev mode
if ('development' == app.get('env')) {
    app.use(express.static(path.join(__dirname, 'client')));
    app.use(express.static(path.join(__dirname, '.tmp')));
} else {
    app.use(express.static(path.join(__dirname, 'dist')));
}

// development onlu
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// Handle 404
app.use(function(req, res) {
    res.render('404.jade', {title: "404 - Page Not Found", showFullNav: false, status: 404, url: req.url });
});

// Handle 500
app.use(function(error, req, res, next) {
    res.render('500.jade', {title: '500: Internal Server Error', status: 500, error: error});
});

// RESTful routes
app.get('/', home.index);
app.get('/about', pages.about);

// server
server.listen(app.get('port'), function(){
    console.log("Express server listening in %s on port %d", colors.green(app.get('env')), app.get('port'));
});

// io cofiguration
io.configure('production', function () {
    io.enable('browser client etag');
    io.set('log level', 1);

    io.set('transports', [
        'websocket'
      , 'flashsocket'
      , 'htmlfile'
      , 'xhr-polling'
      , 'jsonp-polling'
    ]);
});

io.configure('development', function () {
    io.set('transports', ['websocket']);
})

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
