module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			options: {
				seperator: ';',
				stripBanners: true,
				banner: '/*! <%pkg.name%> -v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			dist: {
				src: ['bower_components/angular/angular.js','bower_components/angular-animate/angular-animate.js','bower_components/angular-messages/angular-messages.js','bower_components/angular-aria/angular-aria.js','bower_components/angular-material/angular-material.js','bower_components/angular-ui-router/release/angular-ui-router.js'],
				dest: 'js/dependencies.js',
			}
		},

		uglify: {
			options: {
				manage: true
			},
			my_target: {
				files: [{
					'js/dependencies.min.js': ['js/dependencies.js']
				}]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');


	grunt.registerTask('default',['concat','uglify']);



};
