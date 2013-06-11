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
                files: ['<%= yeoman.app %>/partails/{,*/}*.jade'],
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
                tasks: ['images']
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
                        src: 'partials/*.jade',
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
            html: '.tmp/index.html',
            //html: '<%= yeoman.app %>/index.html',
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
                        '<%= yeoman.app %>/components/normalize-css/normalize.css',
                        '<%= yeoman.app %>/components/components-foundation/css/foundation.css',
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
                        src: ['*.html', 'partials/*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/partials/*.html']
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
                    '.tmp/styles/normalize.css': '<%= yeoman.app %>/components/normalize-css/normalize.css',
                    '.tmp/styles/foundation.css': '<%= yeoman.app %>/components/components-foundation/css/foundation.css'
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
