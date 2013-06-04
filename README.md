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

1.6. add directory (terminal command):

    mkdir app/styles/fonts

1.7. delete public directory:

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

    - app.use(express.static(path.join(__dirname, 'public')));

to:

    - app.use(express.static(path.join(__dirname, 'app')));

and add following line:

    - app.use(express.static(path.join(__dirname, '.tmp')));

1.13. delete the following file:

    - app/index.html

and replace with the following files (and content as per the default app):

    - views/index.jade
    - views/layout.jade

1.14. add the following to app.js (line 18):

    - app.locals.pretty = true;

1.15. update "routes/index.js" to:

    /*
     * GET home page.
     */

    exports.index = function(req, res){
        res.render('index', {
            title: 'Express',
            ngApp: 'mainApp',
            ngController: 'mainCtrl',
            scriptCtrl: 'main'
        });
    };

1.16. update "app/scripts/app.js" to:

    'use strict';

    angular.module('mainApp', [])
      .config(function ($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/main.html',
            controller: 'mainCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });
      });

1.17. update "app/scripts/controllers/main.js" to:

    'use strict';

    angular.module('mainApp')
      .controller('mainCtrl', function ($scope) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
      });

1.18. update "views/layout.jade" to:

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

1.19. update "views/index.jade" to:

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


## Part 2: Karma Reconfiguration

2.1. ensure PhantomJS installed globally:
- brew install phantomjs
- npm install -g phantomjs

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
        …
      'app/components/angular-mocks/angular-mocks.js',
        …
    ];

    to:

    files = [
      JASMINE,
      JASMINE_ADAPTER,
        …
      'test/lib/angular-mocks/angular-mocks.js',
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
        files: ['<%= yeoman.app %>/{,*/}*.jade'],
        tasks: ['jade']
      },
      livereload: {
        files: [
          '.tmp/{,*/}*.html',
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    useminPrepare: {
      html: '.tmp/index.html',
      // html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    htmlmin: {
      dist: {
				...
        files: [{
          expand: true,
          cwd: '.tmp',
          // cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
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

3.1. Add the following files to "views/stylesheets":
- _colors.styl
- _layout.styl
- _looks.styl
- _typography.styl
- _mixins.styl

3.2. Add var require to app.js:
- , stylus = require('stylus')

3.3. Replace in app.js:

    app.use(stylus.middleware(__dirname + '/public'));

with:

    app.use(stylus.middleware({
        src: __dirname + '/views'
            // It will add /stylesheets to this path.
      , dest: __dirname + '/public'
    }));

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


## Part 7: I18n & I10n Integration
