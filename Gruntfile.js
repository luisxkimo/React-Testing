"use strict";

/*global module, require */
 
module.exports = function(grunt) {
	
	var targetFile = './dist/app.js';
	var allJsFiles = ['Gruntfile.js', 'jshintrc.conf.js', './src/**/*.js', './test/e2e/*.js','./test/e2e/e2eSpec.js'];

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),    
		
		jshint: {

			options: {
				jshintrc: 'jshintrc.conf.js'        
			},

			// Configuración estricta. No dejo pasar errores
			release: {
				files: { src: allJsFiles }
			},
			
			// Para desarrollo, no hago que los errores aborten el proceso
			dev: {
				files: { src: allJsFiles },
				options: {
					force: true
				}
			}
		},

		browserify: {
			options: {
					transform:  [ require('grunt-react').browserify ]
			},
			app: {
				src:  ['./src/**/*.js'],
				dest: targetFile
			}
		},

		nightwatch: {
			 options: require('./nightwatch.json')
		},

		mochaTest: {
			unit: {
				options: {
					captureFile: 'reports/unit_tests.xml',
					reporter: 'XUnit',
					quiet: false, // Optionally suppress output to standard out (defaults to false)
					clearRequireCache: true // Optionally clear the require cache before running tests (defaults to false)
				},
				src: ['test/unit/**/*.js']
			}
		},

		watch: {
			e2e: {
				
				files: allJsFiles,
				tasks: ['jshint:dev', 'browserify:app','nightwatch'],
				options : {
					spawn: false,
					reload: true
				}
			},
			unit: {
				files: allJsFiles,
				tasks: ['jshint:dev', 'mochaTest:unit']
			},
			concat: {
				files: allJsFiles,
				tasks: ['jshint:dev', 'browserify:app']
			}
		}
	});

	grunt.loadNpmTasks('grunt-jsxhint');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-nightwatch');
 

	grunt.registerTask('default', 
		'Por defecto, se genera el jshint, se concatena con browserify y se genera app.js', 
		['jshint:dev', 'browserify:app' ,'watch:concat']);

	grunt.registerTask('autotest', 
		'Monitoriza cambios y lanzar los tests unitarios', 
		['watch:unit']);

	grunt.registerTask('autotest-e2e', 
		'Monitoriza cambios, regenera app.js y lanzar los tests e2e', 
		['watch:e2e']);

	grunt.registerTask('xtask', 
		'Monitoriza cambios, regenera app.js y lanzar los tests e2e', 
		['nightwatch']);

	// Faltarían por crear las tareas de ccnet y ccnet-e2e

};