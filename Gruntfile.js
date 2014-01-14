module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist:{
                src: [
                    'Armor.js',
                    'Combat.js',
                    'Inventory.js',
                    'Weapons.js',
                    'nonPlayerCharacter.js',
                    'playerCharacter.js',
                    'rpgConsole.js',
                    'time.js'
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
                    'time.js'
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
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'images/build/'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);
}
