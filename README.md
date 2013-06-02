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

    mkdir public/webfonts

1.7. update add.js:

- remove refs to "users" - line 8 & 34

1.8. delete file:

- routes/user.js

1.9. update .editorconfig

- indent_style = tab
- indent_size = 4

1.10. bower.json (component.json is depreciated):

- rename "component.json" to "bower.json"
- delete "component.json"

1.11. change following line in app.js, from:

- app.use(express.static(path.join(__dirname, 'public')));
to:
- app.use(express.static(path.join(__dirname, 'app')));
and add following line:
- app.use(express.static(path.join(__dirname, '.tmp')));

1.11. delete the following file:

- app/index.html
and replace with the following files (and content as per the default app):
- views/index.jade
- views/layout.jade

1.12. add the following to app.js (line 18):

- app.locals.pretty = true;

1.13. update "routes/index.js" to:

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

1.14. update "app/scripts/app.js" to:

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

1.15. update "app/scripts/controllers/main.js" to:

    'use strict';

    angular.module('mainApp')
      .controller('mainCtrl', function ($scope) {
        $scope.awesomeThings = [
          'HTML5 Boilerplate',
          'AngularJS',
          'Karma'
        ];
      });

1.16. update "views/layout.jade" to:

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

1.17. update "views/index.jade" to:

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


## Part 5: Zurb Foundation 4 Integration

5.1. install "components-foundation":
- bower install components-foundation --save

5.2. add the following to Gruntfile.js:

	copy: {
        css: {
            files: {
                'app/styles/normalize.css': 'app/components/normalize-css/normalize.css',
                'app/styles/foundation.css': 'app/components/components-foundation/css/foundation.css'
            }
        },
		…
	}


## Part 6: Index File Update

6.1. remove the following link from index.jade:

    link(rel='stylesheet', href='styles/main.css')

6.2. add links to the HEAD of index.jade:

    link(rel='stylesheet', href='styles/normalize.css')
    link(rel='stylesheet', href='styles/foundation.css')
    link(rel='stylesheet', href='styles/application.css')

6.3. add link to head:

    link(type='text/plain', rel='author', href='http://localhost:3000/humans.txt')

6.4. add humans.txt file to "app/" directory, with following content:

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

## Part 7: I18n & I10n Integration
