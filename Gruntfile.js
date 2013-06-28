'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'client',
        dist: 'dist'
    };

    var nodemonIgnoredFiles = [
        'README.md',
        'Gruntfile.js',
        '/.git/',
        '/node_modules/',
        '/client/',
        '/dist/',
        '/server',
        '/test/',
        '/temp/',
        '/.tmp',
        '/.sass-cache',
        '*.txt',
        '*.jade'
    ];

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {
    }

    grunt.initConfig({
        yeoman: yeomanConfig,
        pkg: grunt.file.readJSON('package.json'),
        banner:
            '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
            ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        src: {
            js: ['client/app/{,*/}*.js', '<%= yeoman.dist %>/app/{,*/}*.js'],
            specs: ['test/{,*/}*.spec.js'],
            scenarios: ['test/{,*/}*.scenario.js'],
            html: ['client/index.html'],
            tpl: {
                app: ['client/app/{,*/}*.tpl.html'],
                common: ['client/common/{,*/}*.tpl.html']
            },
            less: ['client/less/*.less','client/app/{,*/}*.less'] // recess:build doesn't accept ** in its file patterns
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
                '<%= yeoman.app %>/app/{,*/}*.js'
                //'test/spec/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'test/config/karma.conf.js',
                singleRun: true
            },
            e2e: {
                configFile: 'test/config/karma-e2e.conf.js',
                singleRun: true
            }
        },
        coffee: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/app',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/app',
                        ext: '.js'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/unit',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/unit',
                        ext: '.js'
                    }
                ]
            }
        },
        jade: {
            dist: {
                options: {
                    paths: ['<%= yeoman.app %>/app'],
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/app',
                        dest: '.tmp/templates/',
                        src: '{,*/}*.jade',
                        ext: '.html'
                    }
                ]
            }
        },
        less: {
            dist: {
                files: {
                    '.tmp/styles/_colors.css': '<%= yeoman.app %>/less/_colors.less',
                    '.tmp/styles/_layout.css': '<%= yeoman.app %>/less/_layout.less',
                    '.tmp/styles/_looks.css': '<%= yeoman.app %>/less/_looks.less',
                    '.tmp/styles/_mixins.css': '<%= yeoman.app %>/less/_mixins.less',
                    '.tmp/styles/_typography.css': '<%= yeoman.app %>/less/_typography.less',
                    '.tmp/styles/application.css': '<%= yeoman.app %>/less/application.less',
                    '.tmp/styles/about.css': '<%= yeoman.app %>/app/pages/about.less',
                    '.tmp/styles/user.css': '<%= yeoman.app %>/app/users/user.less'
                }
            }
        },
        concat: {
            dist: {
                options: {
                    banner: '<%= banner %>'
                },
                files: {
                    '<%= yeoman.dist %>/app/scripts.js': '<%= yeoman.app %>/app/{,*/}*.js'
                }
            },
            angular: {
                src:['<%= yeoman.app %>/components/angular/angular.js'],
                dest: '<%= yeoman.dist %>/angular.js'
            }
        },
        useminPrepare: {
            html: '.tmp/index.html',
            //html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/app/{,*/}*.html'],
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
                        cwd: '<%= yeoman.app %>/assets/images',
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
                        cwd: '<%= yeoman.app %>/assets/images',
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
                        '<%= yeoman.app %>/src/components/normalize-css/normalize.css',
                        '<%= yeoman.app %>/src/components/components-foundation/css/foundation.css',
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
                        src: ['app/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/app/{,*/}*.html']
            }
        },
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>/app',
                        src: '*.js',
                        dest: '<%= yeoman.dist %>/app'
                    }
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/app/scripts.js': [
                        '<%= yeoman.dist %>/app/scripts.js'
                    ]
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/app/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/fonts/*'
                    ]
                }
            }
        },
        copy: {
            css: {
                files: {
                    '.tmp/styles/normalize.css': '<%= yeoman.app %>/components/normalize-css/normalize.css',
                    '.tmp/styles/foundation.css': '<%= yeoman.app %>/components/components-foundation/css/foundation.css'
                }
            },
            scripts: {
                files: {
                    '.tmp/scripts/components/modernizr/modernizr.js': '<%= yeoman.app %>/components/modernizr/modernizr.js',
                    '.tmp/scripts/components/angular/angular.js': '<%= yeoman.app %>/components/angular/angular.js',
                    '.tmp/scripts/components/angular-resource/angular-resource.js': '<%= yeoman.app %>/components/angular-resource/angular-resource.js',
                    '.tmp/scripts/components/angular-cookies/angular-cookies.js': '<%= yeoman.app %>/components/angular-cookies/angular-cookies.js',
                    '.tmp/scripts/components/angular-sanitize/angular-sanitize.js': '<%= yeoman.app %>/components/angular-sanitize/angular-sanitize.js',
                    '.tmp/scripts/components/es5-shim/es5-shim.js': '<%= yeoman.app %>/components/es5-shim/es5-shim.js',
                    '.tmp/scripts/components/json3/lib/json3.min.js': '<%= yeoman.app %>/components/json3/lib/json3.min.js',
                    '.tmp/scripts/components/ui-router/angular-ui-router.js': '<%= yeoman.app %>/components/ui-router/release/angular-ui-router.js'
                }
            },
            assets: {
                files: [
                    {
                        dest: '<%= yeoman.dist %>',
                        src: '{,*/}',
                        expand: true,
                        cwd: 'client/assets/'
                    }
                ]
            },
            app: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>/app',
                        dest: '.tmp/scripts/app',
                        src: '{,*/}*.js'
                    }
                ]
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
                            'assets/fonts/*'
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
                'jade',
                'cssmin',
                'less'
            ],
            test: [
                'coffee',
                'less'
            ],
            dist: [
                'coffee',
                'less',
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
                        'less',
                        'scss'
                    ],
                    // nodemon watches the current directory recursively by default
                    watchedFolders: ['client', 'dist', '.tmp'],
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
        },
        open: {
            server: {
                url: 'http://localhost:9000'
            }
        },
        reload: {
            port: 6001,
            proxy: {
                host: 'localhost',
                port: 9000 // should match server.port config
            }
        },
        watch: {
            jade: {
                files: ['<%= yeoman.app %>/app/{,*/}*.jade'],
                tasks: ['jade']
            },
            coffee: {
                files: ['<%= yeoman.app %>/app/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/unit/{,*/}*.coffee', 'test/e2e/{,*/}*.coffee'],
                tasks: ['coffee:test']
            },
            javascript: {
                files: ['<%= yeoman.app %>/app/{,*/}*.js'],
                tasks: ['javascript']
            },
            less: {
                files: ['<%= yeoman.app %>/{,*/}{,*/}*.less'],
                tasks: ['less']
            },
            css: {
                files: ['.tmp/styles/{,*/}*.css'],
                tasks: ['reload']
            },
            assets: {
                files: ['<%= yeoman.app %>/assets/{,*/}*.*'],
                tasks: ['images']
            },
            copy: {
                files: ['<%= yeoman.app %>/app/{,*/}*.js'],
                tasks: ['copy:app']
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        'clean:server',
        'coffee:dist',
        'jade',
        'less',
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
        'less',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'jshint',
        'test',
        'coffee',
        'jade',
        'less',
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
