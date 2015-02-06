to5ify = require '6to5ify'

module.exports = (grunt) ->

  # Configurable paths
  path =
    app: 'src'
    dist: 'dist'

  # Project configuration.
  grunt.initConfig
    path: path
    pkg: grunt.file.readJSON('package.json')

    # Node.js style Commonjs includes
    browserify:
      options:
        watch: false
        keepAlive: false
        transform: ['partialify', 'dotify', '6to5ify']
        browserifyOptions:
          extensions: ['.js', '.dot']
          insertGlobals: false
          detectGlobals: false
          debug: false
      dist:
        files:
          '<%= path.dist %>/main.js': [ '<%= path.app %>/js/main.js' ]
      watch:
        options:
          watch: true
          keepAlive: true
        files:
          '<%= path.dist %>/main.js': [ '<%= path.app %>/js/main.js' ]

    #Concat all vendor libraries into one single file
    concat:
      vendor:
        src: [
          'bower_components/highstock-release/adapters/standalone-framework.js'
          'bower_components/highstock-release/highstock.js'
        ]
        dest: '<%= path.dist %>/vendor.js'

    sass:
      options:
        sourceMap: false
      dist:
        files:
          '<%= path.dist %>/main.css': '<%= path.app %>/style/main.scss'

    # Autoprefix CSS files
    autoprefixer:
      options:
        browsers: ['last 2 versions', 'ie 10', 'ios 7', 'Safari 7']
      target:
        src: '<%= path.dist %>/main.css'

    clean:
      dist: ['<%= path.dist %>']
      unminimized: [
        '<%= path.dist %>/main.js'
        '<%= path.dist %>/main.css'
      ]

    copy:
      index:
        src: '<%= path.app %>/index.html'
        dest: '<%= path.dist %>/index.html'

    # Minimize JavaScript
    uglify:
      main:
        files:
          '<%= path.dist %>/main.min.js': ['<%= path.dist %>/main.js']
          '<%= path.dist %>/vendor.min.js': ['<%= path.dist %>/vendor.js']

    # Minimize CSS
    cssmin:
      main:
        files:
          '<%= path.dist %>/main.min.css': ['<%= path.dist %>/main.css']
          # '<%= path.dist %>/assets/icons.min.css': ['<%= path.dist %>/assets/icons.css']

    replace:
      # Replace unminimized files with minimized versions in index.html
      minimized:
        src: ['<%= path.dist %>/index.html']
        dest: '<%= path.dist %>/'
        replacements: [
            from: /\/(.+)\.js/g
            to: '/$1.min.js'
          ,
            from: /\/(.+)\.css/g
            to: '/$1.min.css'
        ]

    # Append a unique hash to each file based on it's content to force cache reload
    hashres:
      options:
        fileNameFormat: "${hash}-${name}.${ext}"
        renameFiles: true
      main:
        options: {}
        src: [
          '<%= path.dist %>/main.min.js'
          '<%= path.dist %>/vendor.min.js'
          '<%= path.dist %>/main.min.css'
          # '<%= path.dist %>/icons.min.css'
        ]
        dest: '<%= path.dist %>/index.html'

    # Watch changes for these files
    watch:
      sass:
        files: '<%= path.app %>/style/**/*.scss'
        tasks: ['style']

    # Run all watch tasks concurrently
    concurrent:
      options:
        logConcurrentOutput: true
      watch: ['watch:sass', 'browserify:watch']

    # gzip compress
    compress:
      options:
        mode: 'gzip'
      js:
        expand: true
        cwd: '<%= path.dist %>/'
        src: ['**/*.js']
        dest: '<%= path.dist %>/'
        ext: '.min.js.gz'
      css:
        expand: true
        cwd: '<%= path.dist %>'
        src: ['**/*.css']
        dest: '<%= path.dist %>'
        ext: '.min.css.gz'
      html:
        expand: true
        cwd: '<%= path.dist %>'
        src: ['**/*.html']
        dest: '<%= path.dist %>'
        ext: '.html.gz'


  # Load tasks
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-text-replace'
  grunt.loadNpmTasks 'grunt-hashres'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-concurrent'
  grunt.loadNpmTasks 'grunt-contrib-compress'

  # Tasks
  grunt.registerTask 'style', ['sass', 'autoprefixer']
  # Watches for changes
  grunt.registerTask 'run', ['dev', 'concurrent:watch']
  # Build everything for localhost
  grunt.registerTask 'dev', ['clean:dist', 'copy:index', 'concat:vendor', 'style', 'browserify:dist']
  grunt.registerTask 'deploy', ['dev', 'uglify:main', 'cssmin:main', 'replace:minimized', 'clean:unminimized', 'hashres', 'compress']
