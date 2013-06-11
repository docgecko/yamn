# Yeoman, AngularJS, ExpressJS (NodeJS)

The following is the process used to create this base ExpressJS & AngularJS app.


## Part 1: Yeoman, AngularJS, ExpressJS & Karma
1.1. ensure yeoman, grunt, bower, karma, etc. are installed (terminal command):

    npm install -g yo grunt-cli bower karma express

1.2. create "myapp" express application (terminal command):

    express myapp --sessions --css stylus

1.3. switch to myapp directory (terminal command):

    cd myapp

1.4. install express, jade & stylus (terminal command):

    npm install express stylus jade --save

1.5. create angular app within express app (terminal command):

    yo angular

and respond to installation instructions (terminal command):

    n,n,Y,Y,Y

1.6. rename "app" directory to "client"

1.6. add directory (terminal command):

    mkdir client/styles/fonts

1.7. delete public directory (terminal command):

    rm -rf public

1.8. update add.js:

    - remove refs to "users" - line 8 & 34

1.9. delete file:

    - routes/user.js

1.10. update .editorconfig

    - indent_style = tab
    - indent_size = 4

1.11. bower.json (component.json is depreciated):

    - rename "component.json" to "bower.json"
    - delete "component.json"

1.12. change following line in app.js, from:

    app.use(express.static(path.join(__dirname, 'public')));

to:

    app.use(express.static(path.join(__dirname, 'client')));

and add following line:

    app.use(express.static(path.join(__dirname, '.tmp')));

1.13. change following line in app.js, from:

    , routes = require('./routes/index')

to:

    , welcome = require('./server/api/welcome')

1.25. move index.jade and layout.jade from "views" to "client"

1.14. delete the following file:

    - client/index.html

and replace with the following files (and content as per the default app):

    - client/index.jade
    - client/layout.jade

1.15. replace:

    app.set('views', __dirname + '/views');

with

    app.set('views', __dirname + '/client');

1.16. add the following to app.js (line 18):

    - app.locals.pretty = true;

1.17. create directory:

    client/partials

and move the following to this directory:

    client/views/main.jade

1.18. move "routes/index.js" to "server/api/welcome.js" and update file to:

    /*
     * GET welcome page.
     */

    exports.index = function(req, res){
        res.render('index', {
            title: 'Express',
            ngApp: 'mainApp',
            ngController: 'mainCtrl',
            scriptCtrl: 'main'
        });
    };

1.19. update "client/scripts/app.js" to:

    'use strict';

    angular.module('mainApp', [])
      .config(function ($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'mainCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      });

1.20. update "client/scripts/controllers/main.js" to:

    'use strict';

    angular.module('mainApp')
      .controller('mainCtrl', function ($scope) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
      });

1.21. update "client/layout.jade" to:

    doctype 5
    //if lt IE 7
        html(class="no-js lt-ie9 lt-ie8 lt-ie7")
    //if IE 7
        html(class="no-js lt-ie9 lt-ie8")
    //if IE 8
        html(class="no-js lt-ie9")
    // [if gt IE 8] <!
    html(class="no-js")
        // <![endif]
        head
            meta(charset='utf-8')
            meta(http-equiv='X-UA-Compatible', content='IE=edge,chrome=1')
            title= title
            meta(name='description', content='')
            meta(name='viewport', content='width=device-width')
            link(type='text/plain', rel='author', href='http://localhost:3000/humans.txt')
            // Place favicon.ico and apple-touch-icon.png in the root directory
            // build:css styles/main.css
            link(rel='stylesheet', href='styles/normalize.css')
            link(rel='stylesheet', href='styles/foundation.css')
            link(rel='stylesheet', href='styles/application.css')
            // endbuild
        body(ng-app='#{ngApp}')
            block content

1.22. update "client/index.jade" to:

    extends layout

    block content
        //if lt IE 7
            p.chromeframe
            | You are using an outdated browser.
            a(href='http://browsehappy.com/') Upgrade your browser today
            | or
            a(href='http://www.google.com/chromeframe/?redirect=true') install Google Chrome Frame
            | to better experience this site.
        //if lt IE 9
            script(src='components/es5-shim/es5-shim.js')
            script(src='components/json3/lib/json3.min.js')

        // Add your site or application content here
        div(ng-controller="mainCtrl")
            .section-container(ng-view)

        script(src='components/angular/angular.js')
        script(src='components/angular-resource/angular-resource.js')
        script(src='components/angular-cookies/angular-cookies.js')
        script(src='components/angular-sanitize/angular-sanitize.js')

        // build:js scripts/scripts.js
        script(src='scripts/app.js')
        script(src='scripts/controllers/#{scriptCtrl}.js')
        // endbuild

        // Google Analytics: change UA-XXXXX-X to be your site's ID.
        script.
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));

1.23. update app.js with error handling & 404 page, add following code:

    // Handle 404
    app.use(function(req, res) {
        res.render('404.jade', {title: "404 - Page Not Found", showFullNav: false, status: 404, url: req.url });
    });

    // Handle 500
    app.use(function(error, req, res, next) {
        res.render('500.jade', {title: '500: Internal Server Error', status: 500, error: error});
    });

1.24. add 404.jade & 500.jade to "client" directory:

1.27. add color to terminal (terminal command):

    npm install colors --save

and update app.js var:

    , colors = require('colors');

and replace server code with:

    server.listen(app.get('port'), function(){
        console.log("Express server listening in %s on port %d", colors.red(process.env.NODE_ENV), app.get('port'));
    });

1.28. update .jshintrc from:

    "indent": 2,

to
    "indent": 4,


## Part 2: Karma Reconfiguration

2.1. ensure PhantomJS installed globally:

    brew install phantomjs
    npm install -g phantomjs

2.2. update "karma.conf.js", change:

    - browsers = ['Chrome'];

to

    - browsers = ['PhantomJS'];

2.3. move the following angular components from "app/components" to "test/lib/angular":

    - angular-mocks
    - angular-scenario

2.4. update "karma.conf.js" from:

    files = [
      JASMINE,
      JASMINE_ADAPTER,
      'app/components/angular/angular.js',
      'app/components/angular-mocks/angular-mocks.js',
      'app/scripts/*.js',
      'app/scripts/**/*.js',
      ...
    ];

    to:

    files = [
      JASMINE,
      JASMINE_ADAPTER,
       'client/components/angular/angular.js',
       'test/lib/angular-mocks/angular-mocks.js',
       'client/scripts/*.js',
       'client/scripts/**/*.js',
        …
    ];


## Part 2: Jade Integration

2.1. Install grunt-contrib-jade:

    - npm install grunt-contrib-jade --save-dev

2.2. Add following these instructions (https://gist.github.com/kevva/5201657) with some slight mods, which provide details of how to update the Gruntfile.js.

    jade: {
      dist: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp',
          src: '{,*/}*.jade',
          ext: '.html'
        }]
      }
    },

    watch: {
			...
      jade: {
        files: ['<%= yeoman.app %>/partails/{,*/}*.jade'],
        tasks: ['jade']
      }
    },
    useminPrepare: {
      html: '.tmp/index.html',
      // html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/partials/*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    htmlmin: {
      dist: {
				...
        files: [{
          expand: true,
          cwd: '.tmp',
          // cwd: '<%= yeoman.app %>',
          src: ['*.html', 'partials/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    grunt.registerTask('server', [
        …
        'jade',
        …
    ]);

    grunt.registerTask('build', [
            …
        'jade',
            …
    ]);


## Part 3: Stylus Integration (into app, views & Grunt)

3.1. Add the following files to "app/styles":

- _colors.styl
- _layout.styl
- _looks.styl
- _typography.styl
- _mixins.styl

3.4. Install grunt for stylus:

    - npm install grunt-contrib-stylus --save-dev

3.5. Update Gruntfile.js (see this example http://engineering.yp.com/post/grunt) with the following:

    stylus: {
  	    compile : {
    	    files : {
      	        '.tmp/styles/application.css' : 'app/styles/*.styl'
            }
        }
    },

	watch: {
		…
        stylus: {
   		    files: ['<%= yeoman.app %>/styles/{,*/}*.styl'],
    	    tasks: ['stylus']
        },
		…
	},

    grunt.registerTask('server', [
        …
        'stylus',
        …
    ]);


    grunt.registerTask('build', [
        …
        'stylus',
        …
    ]);


## Part 4: Zurb Foundation 4 Integration

4.1. install "components-foundation":
- bower install components-foundation --save

4.2. add the following to Gruntfile.js:

	copy: {
        css: {
            files: {
                'app/styles/normalize.css': 'app/components/normalize-css/normalize.css',
                'app/styles/foundation.css': 'app/components/components-foundation/css/foundation.css'
            }
        },
		…
	}


## Part 5: Index File Update

5.1. remove the following link from index.jade:

    link(rel='stylesheet', href='styles/main.css')

5.2. add links to the HEAD of index.jade:

    link(rel='stylesheet', href='styles/normalize.css')
    link(rel='stylesheet', href='styles/foundation.css')
    link(rel='stylesheet', href='styles/application.css')

5.3. add link to head:

    link(type='text/plain', rel='author', href='http://localhost:3000/humans.txt')

5.4. add humans.txt file to "app/" directory, with following content:

    /* TEAM */
    Your title: Daren Warburton
    Site: daren.sdw@gmail.com
    Twitter: drwarbie
    Location: Lisboa, Portugal

    /* THANKS */



    /* SITE */
      Last update: 2013/05/29
      Standards: HTML5, CSS3
      Components: Modernizer, Karma,
      Software: WebStorm, Git, Terminal, iAwriter, PivotalTracker, Trello


## Part 6: SVG Image Integration

6.1. install grunt-svgmin (terminal command):

    - npm grunt-svgmin --save-dev

6.2. add following code after imagemin:

    svgmin: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= yeoman.app %>/images',
                src: '{,*/}*.svg',
                dest: '<%= yeoman.dist %>/images'
            }]
        }
    },


## Part 7: Grunt Nodemon Server & Reload

7.1. install nodemon and node-inspector globally (terminal command):

    - npm install -g node-inspector nodemon

7.2. install grunt-nodemon and grunt-concurrent (terminal command):

    - npm install grunt-nodemon grunt-concurrent grunt-reload --save-dev

7.3. replace the code in the Gruntfile.js with the following:

    'use strict';

    module.exports = function (grunt) {
        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        // configurable paths
        var yeomanConfig = {
            app: 'app',
            dist: 'dist'
        };

        var nodemonIgnoredFiles = [
            'README.md',
    //        'Gruntfile.js',
            '/.git/',
            '/node_modules/',
    //        '/app/',
    //        '/dist/',
            '/test/',
    //        '/temp/',
    //        '/.tmp',
            '/.sass-cache'
    //        '*.txt',
    //        '*.jade'
        ];

        try {
            yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
        } catch (e) {
        }

        grunt.initConfig({
            yeoman: yeomanConfig,
            reload: {
                port: 6001,
                proxy: {
                    host: 'localhost',
                    port: 9000 // should match server.port config
                }
            },
            watch: {
                jade: {
                    files: ['<%= yeoman.app %>/{,*/}*.jade'],
                    tasks: ['jade']
                },
                coffee: {
                    files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                    tasks: ['coffee:dist']
                },
                coffeeTest: {
                    files: ['test/spec/{,*/}*.coffee'],
                    tasks: ['coffee:test']
                },
                compass: {
                    files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                    tasks: ['compass']
                },
                stylus: {
                    files: ['<%= yeoman.app %>/styles/{,*/}*.styl'],
                    tasks: ['stylus']
                },
                css: {
                    files: ['.tmp/styles/{,*/}*.css'],
                    tasks: ['reload']
                },
                images: {
                    files: ['<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,webp}'],
                    tasks: ['images','reload']
                }
            },
            open: {
                server: {
                    url: 'http://localhost:9000'
                }
            },
            clean: {
                dist: {
                    files: [
                        {
                            dot: true,
                            src: [
                                '.tmp',
                                '<%= yeoman.dist %>/*',
                                '!<%= yeoman.dist %>/.git*'
                            ]
                        }
                    ]
                },
                server: '.tmp'
            },
            jshint: {
                options: {
                    jshintrc: '.jshintrc'
                },
                all: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js'
                    //'test/spec/{,*/}*.js'
                ]
            },
            karma: {
                unit: {
                    configFile: 'karma.conf.js',
                    singleRun: true
                }
            },
            coffee: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= yeoman.app %>/scripts',
                            src: '{,*/}*.coffee',
                            dest: '.tmp/scripts',
                            ext: '.js'
                        }
                    ]
                },
                test: {
                    files: [
                        {
                            expand: true,
                            cwd: 'test/spec',
                            src: '{,*/}*.coffee',
                            dest: '.tmp/spec',
                            ext: '.js'
                        }
                    ]
                }
            },
            compass: {
                options: {
                    sassDir: '<%= yeoman.app %>/styles',
                    cssDir: '.tmp/styles',
                    imagesDir: '<%= yeoman.app %>/images',
                    javascriptsDir: '<%= yeoman.app %>/scripts',
                    fontsDir: '<%= yeoman.app %>/styles/fonts',
                    importPath: '<%= yeoman.app %>/components',
                    relativeAssets: true
                },
                dist: {},
                server: {
                    options: {
                        debugInfo: true
                    }
                }
            },
            jade: {
                dist: {
                    options: {
                        pretty: true
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '<%= yeoman.app %>',
                            dest: '.tmp',
                            src: '{,*//*}*.jade',
                            ext: '.html'
                        }
                    ]
                }
            },
            stylus: {
                compile: {
                    files: {
                        '.tmp/styles/application.css': '<%= yeoman.app %>/styles/*.styl'
                    }
                }
            },
            concat: {
                dist: {
                    files: {
                        '<%= yeoman.dist %>/scripts/scripts.js': [
                            '.tmp/scripts/{,*/}*.js',
                            '<%= yeoman.app %>/scripts/{,*/}*.js'
                        ]
                    }
                }
            },
            useminPrepare: {
                // html: '.tmp/index.html',
                html: '<%= yeoman.app %>/index.html',
                options: {
                    dest: '<%= yeoman.dist %>'
                }
            },
            usemin: {
                html: ['<%= yeoman.dist %>/{,*/}*.html'],
                css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
                options: {
                    dirs: ['<%= yeoman.dist %>']
                }
            },
            imagemin: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= yeoman.app %>/images',
                            src: '{,*/}*.{png,jpg,jpeg}',
                            dest: '<%= yeoman.dist %>/images'
                        }
                    ]
                }
            },
            svgmin: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= yeoman.app %>/images',
                            src: '{,*/}*.svg',
                            dest: '<%= yeoman.dist %>/images'
                        }
                    ]
                }
            },
            cssmin: {
                dist: {
                    files: {
                        '<%= yeoman.dist %>/styles/main.css': [
                            // list any css files you'd like to combine/minify into main.css here
                            'app/components/normalize-css/normalize.css',
                            'app/components/components-foundation/css/foundation.css',
                            '.tmp/styles/{,*/}*.css',
                            '<%= yeoman.app %>/styles/{,*/}*.css'
                        ]
                    }
                }
            },
            htmlmin: {
                dist: {
                    options: {
                        /*removeCommentsFromCDATA: true,
                         // https://github.com/yeoman/grunt-usemin/issues/44
                         //collapseWhitespace: true,
                         collapseBooleanAttributes: true,
                         removeAttributeQuotes: true,
                         removeRedundantAttributes: true,
                         useShortDoctype: true,
                         removeEmptyAttributes: true,
                         removeOptionalTags: true*/
                    },
                    files: [
                        {
                            expand: true,
                            cwd: '.tmp',
                            // cwd: '<%= yeoman.app %>',
                            src: ['*.html', 'views/*.html'],
                            dest: '<%= yeoman.dist %>'
                        }
                    ]
                }
            },
            cdnify: {
                dist: {
                    html: ['<%= yeoman.dist %>/*.html']
                }
            },
            ngmin: {
                dist: {
                    files: [
                        {
                            expand: true,
                            cwd: '<%= yeoman.dist %>/scripts',
                            src: '*.js',
                            dest: '<%= yeoman.dist %>/scripts'
                        }
                    ]
                }
            },
            uglify: {
                dist: {
                    files: {
                        '<%= yeoman.dist %>/scripts/scripts.js': [
                            '<%= yeoman.dist %>/scripts/scripts.js'
                        ]
                    }
                }
            },
            rev: {
                dist: {
                    files: {
                        src: [
                            '<%= yeoman.dist %>/scripts/{,*/}*.js',
                            '<%= yeoman.dist %>/styles/{,*/}*.css',
                            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                            '<%= yeoman.dist %>/styles/fonts/*'
                        ]
                    }
                }
            },
            copy: {
                css: {
                    files: {
                        '.tmp/styles/normalize.css': 'app/components/normalize-css/normalize.css',
                        '.tmp/styles/foundation.css': 'app/components/components-foundation/css/foundation.css'
                    }
                },
                dist: {
                    files: [
                        {
                            expand: true,
                            dot: true,
                            cwd: '<%= yeoman.app %>',
                            dest: '<%= yeoman.dist %>',
                            src: [
                                '*.{ico,txt}',
                                '.htaccess',
                                'components/**/*',
                                'images/{,*/}*.{gif,webp}',
                                'styles/fonts/*'
                            ]
                        }
                    ]
                }
            },
            concurrent: {
                nodemon: {
                    options: {
                        logConcurrentOutput: true
                    },
                    tasks: [
                        'nodemon:nodeInspector',
                        'nodemon:dev',
                        'watch'
                    ]
                },
                server: [
                    'coffee:dist',
                    'compass:server',
                    'jade',
                    'cssmin'
    //                'stylus:compile'
                ],
                test: [
                    'coffee',
                    'compass'
                ],
                dist: [
                    'coffee',
                    'compass:dist',
                    'imagemin',
                    'svgmin',
                    'htmlmin'
                ]
            },
            nodemon: {
                dev: {
                    options: {
                        file: 'app.js',
                        args: ['development'],
                        watchedExtensions: [
                            'js',
                            'coffee',
                            'jade',
                            'html',
                            'css',
                            'scss'
                        ],
                        // nodemon watches the current directory recursively by default
                        watchedFolders: ['app', 'dist','.tmp'],
                        debug: true,
                        delayTime: 1,
                        ignoredFiles: nodemonIgnoredFiles
                    }
                },
                nodeInspector: {
                    options: {
                        file: 'node-inspector.js',
                        exec: 'node-inspector',
                        ignoredFiles: nodemonIgnoredFiles
                    }
                }
            }
        });

        grunt.renameTask('regarde', 'watch');

        grunt.registerTask('server', [
            'clean:server',
            'coffee:dist',
    //        'compass:server',
            'jade',
            'stylus:compile',
            'copy',
            'concurrent:server',
            'concurrent:nodemon',
            'open',
            'watch'
        ]);

        grunt.registerTask('test', [
            'clean:server',
            'concurrent:test',
            'coffee',
            'compass',
            'karma'
        ]);

        grunt.registerTask('build', [
            'clean:dist',
            'concurrent:dist',
            'jshint',
            'test',
            'coffee',
    //        'compass:dist',
            'jade',
            'stylus:compile',
            'useminPrepare',
            'imagemin',
            'cssmin',
            'htmlmin',
            'concat',
            'copy',
            'cdnify',
            'ngmin',
            'uglify',
            'rev',
            'usemin'
        ]);

        grunt.registerTask('default', ['build']);
    };


## Part 7: MongooseJS Integration

7.1. install mongoosejs (terminal command):

    - npm install mongoose --save

7.2. update app.js to include mongoose and connection vars:

    , mongoose = require('mongoose')
    , db = mongoose.createConnection('localhost', 'default'),


## Part 8: Socket.io Integration

8.1. install socket.io (terminal command):

    - npm install socket.io --save

8.2. update app.js to include var:

    var io = require('socket.io')


## Part 9: Redis Integration

9.1. install redis & hiredis (terminal command):

    - npm install hiredis redis connect-redis --save

9.2. update app.js after 'mongoose' var to include:

    , RedisStore = require('redis-connect')(express);

9.3. replace:

    app.use(express.session());

with (replace 'MyLittleSecret' with your own secret):

    app.use(express.session({
        store: new RedisStore,
        secret: 'MyLittleSecret'
    }));


## Part 10: CSRF Protection For ExpressJS and AngularJS (see http://mircozeiss.com/using-csrf-with-express-and-angular/)

10.1. update app.js to include (after var io):

    var csrfValue = function(req) {
        var token = (req.body && req.body._csrf)
            || (req.query && req.query._csrf)
            || (req.headers['x-csrf-token'])
            || (req.headers['x-xsrf-token']);
        return token;
    };

and replace:

    app.use(express.cookieSession());):

with:

    app.use(express.session({
        store: new RedisStore,
        secret: 'hdy72by3s8su28js2uk9ie90u2389d23rytg4710yj18d14678239s470'
    }));
    app.use(express.csrf({value: csrfValue}));
    app.use(function(req, res, next) {
        res.cookie('XSRF-TOKEN', req.session._csrf);
        next();
    });