module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist:{
                src: [
                    'Armor.js',
                    'Combat.js',
                    'Inventory.js',
                    'Weapodns.js',
                    'nonPlayerCharacter.js',
                    'playerCharacter.js',
                    'rpgConsole.js',
                    'timer.js'
                    ],
                dest: 'build/production.js'
            }
        },
        uglify: {
            build:{
                src: 'build/production.js',
                dest: 'build/production.min.js'
            }
        },
        jshint:{
            src: ['Armor.js',
                    'Combat.js',
                    'Inventory.js',
                    'Weapons.js',
                    'nonPlayerCharacter.js',
                    'playerCharacter.js',
                    'rpgConsole.js',
                    'timer.js'
                    ],
            options: {
                laxcomma: true,
                reporter: 'jslint',
                reporterOutput: 'jshint.xml'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'Armor.js',
                    'Combat.js',
                    'Inventory.js',
                    'Weapons.js',
                    'nonPlayerCharacter.js',
                    'playerCharacter.js',
                    'rpgConsole.js',
                    'timer.js'
                    ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['css/*.css'],
                options: {
                    spawn: false
                }
            }
        },
        imagemin:{
            dynamic: {
                files: [{
                    expand: true,
                    //cwd: '/images/',
                    src: 'docs/images/*.{png,jpg,gif}',
                    dest: 'build/test/'
                }],
                options:{
                    optimizationLevel: 0
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
}
