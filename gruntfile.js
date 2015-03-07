module.exports = function (grunt) {
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),

            assemble: {
                options: {
                    layoutdir: 'include/html/layouts/',
                    partials: ['include/html/partials/**/*.hbs'],
                    helpers: ['include/html/helpers/*.js'],
                    data:'include/html/data/*.json'
                },
                site: {
                    expand: true,
                    cwd: 'include/html/pages/',
                    src: ['**/*.hbs'],
                    dest: 'public/'
                }
            },

            connect: {
                server: {
                    options: {
                        base: 'public'
                    }
                }
            },

            bower: {
              install: {
                options: {
                  copy: false
                }
              }
            },

            clean: {
                html: ['public/*.html']
            },

            copy: {
                images: {
                    files: [
                        {
                            expand: true, 
                            cwd: '<%= pkg.imgSource %>/',
                            src: ['**/*'], 
                            dest: '<%= pkg.imgDestination %>/'
                        }
                    ]
                },
                fonts: {
                    files: [
                        {
                            expand: true, 
                            cwd: '<%= pkg.fontsSource %>/',
                            src: ['**/*'], 
                            dest: '<%= pkg.fontsDestination %>/'
                        }
                    ]
                }

            },

            jshint: {
                all: ['<%= pkg.jsSource %>/**/*.js']
            },

            concat: {
                dist: {
                    files: {
                        '<%= pkg.jsDestination %>/<%= pkg.name %>.js': ['<%= pkg.jsSource %>/*.js']
                    }
                },
                vendor: {
                  files: {
                    //Copy jquery from bower
                    '<%= pkg.jsDestination %>/vendor/jquery.min.map': ['bower_components/jquery/dist/jquery.min.map'],

                    //Copy picturefill for responsive images
                    //'<%= pkg.jsDestination %>/vendor/picturefill.min.js': ['bower_components/picturefill/dist/picturefill.min.js'],

                    //Only import bootstrap plugins that are used
                    '<%= pkg.jsDestination %>/vendor/vendor.js': [
                        'bower_components/jquery/dist/jquery.min.js',
                    //    'bower_components/bootstrap/js/dropdown.js',
                    //    'bower_components/bootstrap/js/collapse.js',
                    //    'bower_components/jquery-placeholder/jquery.placeholder.min.js',
                    //    'bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js'
                    ]
                  }
                }
            },

            uglify: {
                dist: {
                    files: {
                        '<%= pkg.jsDestination %>/<%= pkg.name %>.min.js': ['<%= pkg.jsDestination %>/<%= pkg.name %>.js'],
                        '<%= pkg.jsDestination %>/vendor.min.js': ['<%= pkg.jsDestination %>/vendor.js']
                    }
                }
            },

            modernizr: {
                dist: {
                    devFile : 'bower_components/modernizr/modernizr.js',
                    outputFile: '<%= pkg.jsDestination %>/vendor/modernizr.min.js',
                    files: {
                        src: [
                          '<%= pkg.jsSource %>/{,*/}*.js',
                          '<%= pkg.sassSource %>/{,*/}*.scss'
                        ]
                    }
                }
            },

            sass: {
                dist: {
                    options: {
                        style: 'expanded'
                    },
                    files: {
                        '<%= pkg.cssDestination %>/<%= pkg.name %>.css': '<%= pkg.sassSource %>/<%= pkg.name %>.scss'
                    }
                }
            },

            cssmin: {
                compress:{
                    files:{
                        "<%= pkg.cssDestination %>/<%= pkg.name %>.min.css":["<%= pkg.cssDestination %>/<%= pkg.name %>.css"]
                    }
                }
            },

            autoprefixer: {
                options: {
                    browsers: ['last 2 versions']
                },
                dist: {
                    src: '<%= pkg.cssDestination %>/<%= pkg.name %>.min.css',
                    dest: '<%= pkg.cssDestination %>/<%= pkg.name %>.min.css'
                }
            },

            notify_hooks: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 5, // maximum number of notifications from jshint output
                    title: "Project Name", // defaults to the name in package.json, or will use project directory's name
                    success: false, // whether successful grunt executions should be notified automatically
                    duration: 3 // the duration of notification in seconds, for `notify-send only
                }
            },

            watch: {
                options: {
                    livereload: true
                },
                js: {
                    files: [
                        '<%= pkg.jsSource %>/**/*' ],
                    tasks: ['jshint','concat:dist', 'uglify:dist', 'modernizr']
                },
                sass: {
                    files: ['<%= pkg.sassSource %>/**/*'],
                    tasks: ['sass', 'cssmin', 'modernizr', 'autoprefixer']
                },
                html: {
                  files: ['include/html/**/*.hbs'],
                  tasks: ['default']
                }
            }
        });

    grunt.registerTask('default', [
      'bower:install',
      'jshint', 
      'clean', 
      'copy', 
      'modernizr', 
      'concat', 
      'uglify', 
      'sass',
      'cssmin', 
      'autoprefixer', 
      'assemble',
      'notify_hooks'
    ]);
    grunt.registerTask('build', ['default']);
    grunt.registerTask('serve', ['default', 'connect', 'watch']);

    grunt.loadNpmTasks("grunt-autoprefixer");
    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-notify');
};
