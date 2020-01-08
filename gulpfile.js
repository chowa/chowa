const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpClean = require('gulp-clean');
const gulpSass = require('gulp-sass');
const gulpTs = require('gulp-typescript');
const gulpReplace = require('gulp-replace');
const gulpRename = require('gulp-rename');
const gulpBanner = require('gulp-banner');
const prodConfig = require('./webpack.config.prod');
const pkg = require('./package.json');

const banner = `/**
 * @license ${pkg.name} v${pkg.version}
 *
 * Copyright (c) Chowa Techonlogies Co.,Ltd.(http://www.chowa.cn).
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;

const moduleDir = path.join(__dirname, 'es');

gulp.task('clean dist', () => {
    if (!fs.existsSync(prodConfig.output.path)) {
        return Promise.resolve();
    }

    return gulp.src(prodConfig.output.path, { read: false })
        .pipe(gulpClean({ force: true }));
});

gulp.task('clean module', () => {
    if (!fs.existsSync(moduleDir)) {
        return Promise.resolve();
    }

    return gulp.src(moduleDir, { read: false })
        .pipe(gulpClean({ force: true }));
});

gulp.task('synchronous version', () => {
    const versionFile = path.join(__dirname, 'components/version/index.ts');
    let versionContent = fs.readFileSync(versionFile);
    versionContent = versionContent.toString().replace(/\d+\.\d+\.\d+/, pkg.version);
    fs.writeFileSync(versionFile, versionContent);

    return Promise.resolve();
});

gulp.task('compile sass', () => {
    return Promise.all([
        gulp.src(path.join(__dirname, 'components/*/style/*.scss'))
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(gulpBanner(banner))
            .pipe(gulp.dest(moduleDir)),

        gulp.src([
            path.join(__dirname, 'components/styles/reset.scss'),
            path.join(__dirname, 'components/styles/*/*.scss')
        ])
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpBanner(banner))
        .pipe(gulp.dest(path.join(moduleDir, 'styles')))
    ]);
});

gulp.task('copy sass', () => {
    return Promise.all([
        gulp.src(path.join(__dirname, 'components/*/style/*.scss'))
        .pipe(gulpBanner(banner))
        .pipe(gulp.dest(moduleDir)),

        gulp.src([
            path.join(__dirname, 'components/styles/*.scss'),
            path.join(__dirname, 'components/styles/*/*.scss')
        ])
        .pipe(gulpBanner(banner))
        .pipe(gulp.dest(path.join(moduleDir, 'styles')))
    ]);
});

gulp.task('compile typescript', () => {
    const tsProject = gulpTs.createProject('tsconfig.json', { declaration: true });
    return gulp.src([
            path.join(__dirname, 'components/*/*.{ts,tsx}'),
            path.join(__dirname, 'components/*.{ts,tsx}'),
            path.join(__dirname, 'components/*/*/*.{ts,tsx}')
        ])
        .pipe(tsProject())
        .pipe(gulpBanner(banner))
        .pipe(gulp.dest(moduleDir));
});

gulp.task('create css index', () => {
    return gulp.src(path.join(prodConfig.output.path, 'lib/*/style/index.js'))
        .pipe(gulpReplace(/\.scss/g, '.css'))
        .pipe(gulpReplace(/style/g, 'style/css'))
        .pipe(gulpRename((p) => {
            p.basename = 'css';
        }))
        .pipe(gulp.dest(moduleDir));
});

gulp.task('create css types', () => {
    return gulp.src(path.join(prodConfig.output.path, 'lib/*/style/*.d.ts'))
        .pipe(gulpReplace(/\.scss/g, '.css'))
        .pipe(gulpReplace(/style/g, 'style/css'))
        .pipe(gulpRename((p) => {
            p.basename = 'css';
            p.extname = '.d.ts';
        }))
        .pipe(gulp.dest(moduleDir));
});

gulp.task('default', gulp.series(
    'clean dist',
    'clean module',
    'synchronous version',
    'compile sass',
    'copy sass',
    'compile typescript',
    'create css index',
    'create css types'
));
