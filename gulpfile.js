
// ----------------------------------------------------------------------
// ∴ Gulp Imports.
// ----------------------------------------------------------------------

const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const hash = require('gulp-hash-filename');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const tsc = require('gulp-typescript');
const babel = require('gulp-babel');
const rollup = require('gulp-better-rollup');
const babel2 = require('rollup-plugin-babel');
const color = require('gulp-color');
const cmd = require('child_process').exec;
const devColor = "GREEN";
const prodColor = "CYAN";




// ----------------------------------------------------------------------
// ∴ Build configuration.
// ----------------------------------------------------------------------

// Create build configuration based on argument conditions.
// 1st parameter: 'Development Environment', can be set to 'production', or 'development'.
// 1st parameter: 'Use Angular Compiler', can be set to 'true', or 'false'.
// 1st parameter: 'Use Watch', can be set to 'true', or 'false'. This is always disabled in prod.
// This MUST be set under the 'config' flag of package.json located in the root directory of nFrame.

const config = {
    environment: '',
    useAngular: '',
    watch: '',
    useNgRecompiler: true
};




// ----------------------------------------------------------------------
// ∴ Path Variables.
// ----------------------------------------------------------------------

const   cssDest                 =      './nStatic/css';
        cssBundleName           =      'bundle.css';
        jsDest                  =      './nStatic/js';
        jsBundleName            =      'bundle.js';
        cssBundleLocal          =      `${cssDest}/${cssBundleName}`;
        jsBundleLocal           =      `${jsDest}/${jsBundleName}`;
        sassSource              =      './webStyle/**/**/*.scss';
        sassBase                =      './webStyle/main.scss';
        tsSource                =      './webTS/**/*.ts';
        tsCompilerOuts          =      './webTS/_compiler/**/*.ts';
        jsCompilerOuts          =      './webTS/_compiler/**/*.js';
        compilerEs6Out          =      './webTS/_compiler/es6_out';
        jsFolderCapture         =      './webTS/**/*.js';
        es6TranspileCapture     =      './webTS/_compiler/es6_out/**/*.js';
        jQSource                =      './node_modules/jquery/dist/jquery.min.js';
        compilerEs5Out          =      './webTS/_compiler/es5_out';
        mainEs5Capture          =      './webTS/_compiler/es5_out/main.js';
        crossAppJsCapture       =      './webApp/src/**/**/*.js';
        webAppDistOut           =      './webApp/dist/**/*.*';
        preBundleJsAsset        =      `${jsDest}/main.js`;
        staticLocals            =      `${jsDest}/*.js`;
        karma                   =      './webApp/src/karma.conf.js';



// ----------------------------------------------------------------------
// ∴ Capture NPM build command and execute paths based on selection.
// ----------------------------------------------------------------------

gulp.task('development-true-false', function() {
    config.environment = 'development';
    config.useAngular = true;
    config.watch = false;
    developmentBuild();
}) 

gulp.task('development-false-false', function() {
    config.environment = 'development';
    config.useAngular = false;
    config.watch = false;
    developmentBuild();
}) 

gulp.task('development-true-true', function() {
    config.environment = 'development';
    config.useAngular = true;
    config.watch = true;
        console.log(color(`
        ---------------------------------------

        ∴ nFrame Development Build Initialised.
        ∴ Watching: Angular & SCSS Changes.

        ---------------------------------------`,
        'YELLOW'));
    gulp.start('build-angular-watch'),
    gulp.watch(sassSource, ['sassDevBuild'])
}) 

gulp.task('development-false-true', function() {
    config.environment = 'development';
    config.useAngular = false;
    config.watch = true;
        console.log(color(`
        ---------------------------------------
        
        ∴ nFrame Development Build Initialised.
        ∴ Watching: TypeScript & SCSS Changes.

        ---------------------------------------`,
        'YELLOW'));
    gulp.watch(tsSource, ['buildDevTypeScript']),
    gulp.watch(sassSource, ['sassDevBuild'])
}) 

gulp.task('production-true-false', function() {
    config.environment = 'production';
    config.useAngular = true;
    config.watch = false;
    productionBuild();
}) 

gulp.task('production-false-false', function() {
    config.environment = 'production';
    config.useAngular = false;
    config.watch = false;
    productionBuild();
}) 

gulp.task('production-true-true', function() {
    console.log(color(`
    ---------------------------------------
    
    ∴ Watch cannot be initialised on production build.

    ---------------------------------------`
    , 'RED'));
}) 

gulp.task('production-false-true', function() {
    console.log(color(`
    ---------------------------------------
    
    ∴ Watch cannot be initialised on production build.

    ---------------------------------------`
    , 'RED'));
}) 



// ----------------------------------------------------------------------
// ∴ Initialise compiler method path.
// ----------------------------------------------------------------------

const developmentBuild = function() {
    let compilerType;
    switch (config.useAngular) {
        case true:
        compilerType = color("Angular Compiler", 'RED');
        console.log(color(`
        ---------------------------------------
        
        ∴ nFrame Development Build Initialised.
        ∴ Compiler type: ${compilerType}`,
        devColor));
        console.log(color(`
        ---------------------------------------
        `, devColor));
        gulp.start('buildDevAngular');
        break;
        case false:
        compilerType = color("TypeScript Compiler", 'YELLOW');
        console.log(color(`
        ---------------------------------------
        
        ∴ nFrame Development Build Initialised.
        ∴ Compiler type: ${compilerType}`,
        devColor));
        console.log(color(`
        ---------------------------------------
        `, devColor));
        gulp.start('buildDevTypeScript');
        break;
    }
}

const productionBuild = function() {
    let compilerType;
    switch (config.useAngular) {
        case true:
        compilerType = color("Angular Compiler", 'RED');
        console.log(color(`
        ---------------------------------------
        
        ∴ nFrame Production Build Initialised.
        ∴ Compiler type: ${compilerType}`,
        prodColor));
        console.log(color(`
        ---------------------------------------
        `, prodColor));
        gulp.start('buildProdAngular');
        break;
        case false:
        compilerType = color("TypeScript Compiler", 'YELLOW');
        console.log(color(`
        ---------------------------------------
        
        ∴ nFrame Production Build Initialised.
        ∴ Compiler type: ${compilerType}`,
        prodColor));
        console.log(color(`
        ---------------------------------------
        `, prodColor));
        gulp.start('buildProdTypeScript');
        break;
    }
}


// ----------------------------------------------------------------------
// ∴ Build front-end for Development.
// ----------------------------------------------------------------------

// With Angular Compiler.
gulp.task('buildDevAngular', function (callback) {
    switch (config.watch) {
        case true:
        runSequence(
            'build-angular-watch',
            'mark-angular-complete',
        )
        break;
        case false:
        runSequence(
            'build-angular',
            'sassDevBuild',
            'mark-complete',
            callback);
        break;
    }

})

// With TypeScript Compiler.
gulp.task('buildDevTypeScript', function (callback) {
    switch (config.watch) {
        case true: 
        runSequence(
            'pre-clean',
            'ts-to-es6',
            'es6-to-es5',
            'es5-concat',
            'jquery-concat',
            'post-clean-dev',
            'mark-ts-complete',
            callback);
        break;
        case false:
        runSequence(
            'pre-clean',
            'ts-to-es6',
            'es6-to-es5',
            'es5-concat',
            'jquery-concat',
            'sassDevBuild',
            'post-clean-dev',
            'mark-complete',
            callback);
        break;                
    }
})



// ----------------------------------------------------------------------
// ∴ Build front-end for production.
// ----------------------------------------------------------------------

// With Angular Compiler.
gulp.task('buildProdAngular', function (callback) {
    runSequence(
        'pre-clean-prod-ng',
        'build-angular-prod',
        'concat-ng',
        'sassProdBuild',
        'mark-complete',
        callback);
})

// With TypeScript Compiler.
gulp.task('buildProdTypeScript', function (callback) {
    runSequence(
        'pre-clean-prod',
        'ts-to-es6-prod',
        'es6-to-es5',
        'es5-concat-prod',
        'jquery-concat-compress',
        'sassProdBuild',
        'post-clean-prod',
        'mark-complete',
        callback);
})



// ----------------------------------------------------------------------
// ∴ Initialise either the Angular compiler, or the TypeScript compiler.
// ----------------------------------------------------------------------

gulp.task('build-angular', function(cb) {
    console.log(color(`
        ∴ Building Angular in DEVELOPMENT Mode.
    `, devColor))
    cmd('ng build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})

gulp.task('build-angular-watch', function(cb) {

    var internalConfig = config;

    console.log(color(`
        ∴ Building Angular in DEVELOPMENT Mode.
    `, devColor))
    console.log(color(`
        ∴ WARNING: Angular will recompile SILENTLY in this state.
        ∴ This is due to the nature of reporting in the NGBuild Pipeline.
        ∴ For ore verbose ngRebuild reporting, set 'useNgRecompiler' on line 42 of this file to 'false'
        ∴ And instead run 'ng build --watch' in a seperate terminal window alongside 'npm run build'
        ∴ useNgRecompiler is currently set to ${internalConfig.useNgRecompiler}
    `, 'YELLOW'))

    if(internalConfig.useNgRecompiler === true) {
        cmd('ng build --watch', function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    }
})

gulp.task('build-angular-prod', function(cb) {
    console.log(color(`
        ∴ Building Angular in PRODUCTION Mode.
    `, prodColor)); 
    cmd('ng build --prod --aot --output-hashing none', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})



// ----------------------------------------------------------------------
// ∴ Initialise Typscript compiler, concatinate jQuery.
// ----------------------------------------------------------------------

gulp.task('pre-clean', function() {
    console.log(color(`
        ∴ Cleaning up JS/TS folders
    `, devColor)); 
    gulp.src([staticLocals, tsCompilerOuts, jsCompilerOuts], {
        read: false
    })
    .pipe(clean({force: true}));
})

gulp.task('ts-to-es6', function() {
    console.log(color(`
        ∴ Running TypeScript Transpiler
    `, devColor)); 
    return gulp.src([tsSource])
        .pipe(tsc({
            typescript: require('typescript'),
            target: 'ES6',
        }))
        .pipe(gulp.dest(compilerEs6Out));
});

gulp.task('pre-clean-prod', function() {
    console.log(color(`
        ∴ Cleaning up JS/TS folders
    `, prodColor)); 
    gulp.src([staticLocals, tsCompilerOuts, jsCompilerOuts], {
        read: false
    })
    .pipe(clean({force: true}));
})

gulp.task('pre-clean-prod-ng', function() {
    console.log(color(`
        ∴ Cleaning up Angular folders
    `, prodColor)); 
    gulp.src([webAppDistOut, staticLocals, tsCompilerOuts, jsCompilerOuts], {
        read: false
    })
    .pipe(clean({force: true}));
})

gulp.task('ts-to-es6-prod', function() {
    console.log(color(`
        ∴ Running TypeScript Transpiler
    `, prodColor)); 
    return gulp.src([tsSource])
        .pipe(tsc({
            typescript: require('typescript'),
            target: 'ES6',
        }))
        .pipe(gulp.dest(compilerEs6Out));
});

gulp.task('es6-to-es5', function() {
    return gulp.src(
            [
                es6TranspileCapture
            ])
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(gulp.dest(compilerEs5Out));
});

gulp.task('es5-concat', function() {
    return gulp.src(mainEs5Capture)
        .pipe(sourcemaps.init())
        .pipe(rollup({
            plugins: [ babel2() ]
        }, 
        {
            format: 'cjs',
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsDest));
});

gulp.task('es5-concat-prod', function() {
    return gulp.src(mainEs5Capture)
        .pipe(rollup({
            plugins: [ babel2() ]
        }, 
        {
            format: 'cjs',
        }))
        .pipe(gulp.dest(jsDest));
});

gulp.task('jquery-concat', function() {
    return gulp.src([jQSource, preBundleJsAsset])
    .pipe(concat(jsBundleName))
    .pipe(gulp.dest(jsDest));
})

gulp.task('jquery-concat-compress', function() {
    return gulp.src([jQSource, preBundleJsAsset])
    .pipe(uglify())
    .pipe(concat(jsBundleName))
    .pipe(gulp.dest(jsDest));
})

gulp.task('post-clean-dev', function() {
    console.log(color(`
        ∴ Cleaning Development environment.
    `, devColor)); 
    gulp.src([preBundleJsAsset, jsFolderCapture, crossAppJsCapture], {
        read: false
    })
    .pipe(clean({force: true}));
})

gulp.task('post-clean-prod', function() {
    console.log(color(`
        ∴ Cleaning Production environment.
    `, prodColor)); 
    gulp.src([preBundleJsAsset, jsFolderCapture, crossAppJsCapture, karma], {
        read: false
    })
    .pipe(clean({force: true}));
})

gulp.task('concat-ng', function() {
    console.log(color(`
        ∴ Packaging Angular Production bundle.
    `, prodColor));
    return gulp.src([
    './webApp/dist/webApp/es2015-polyfills.js',
    './webApp/dist/webApp/polyfills.js',
    './webApp/dist/webApp/main.js',
    './webApp/dist/webApp/runtime.js'
])
    .pipe(uglify())
    .pipe(concat(jsBundleName))
    .pipe(gulp.dest(jsDest))
})



// ----------------------------------------------------------------------
// Initialise SCSS Transpilers, concatinate and distribute to Static.
// ----------------------------------------------------------------------

gulp.task('sassDevBuild', function () {
    console.log(color(`
        ∴ Running SCSS -> CSS Development Transpiler
        ∴ Source Mapping ENABLED
    `, devColor)); 
    gulp.src([
        sassBase
    ])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cssnano())
    .pipe(concat(cssBundleName))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssDest));
    if (config.watch === true) {
        gulp.start('mark-scss-complete');
    }
});

gulp.task('sassProdBuild', function () {
    console.log(color(`
        ∴ Cleaning CSS folder
    `, prodColor)); 
    gulp.src('../Static/css/bundle.css', {
        read: false
    })
    .pipe(clean({force: true}));
    console.log(color(`
        ∴ Running SCSS -> CSS Production Transpiler
        ∴ Source Mapping DISABLED
    `, prodColor)); 
    gulp.src([
        sassBase
    ])
    .pipe(sass())
    .pipe(cssnano())
    .pipe(concat(cssBundleName))
    .pipe(gulp.dest(cssDest));
});



// ----------------------------------------------------------------------
// Mark Operation as Complete.
// ----------------------------------------------------------------------

gulp.task('mark-complete', function() {
    console.log(color(`
        ∴ Build Complete ✓
    `, 'BLUE'))
})

gulp.task('mark-ts-complete', function() {
    console.log(color(`
        ∴ TypeScript Re-Transpile Complete ✓
    `, 'YELLOW'))
})

gulp.task('mark-scss-complete', function() {
    console.log(color(`
        ∴ SCSS Re-Transpile Complete ✓
    `, 'YELLOW'))
})

gulp.task('mark-angular-complete', function() {
    console.log(color(`
        ∴ Angular Re-Transpile Complete ✓
    `, 'YELLOW'))
})