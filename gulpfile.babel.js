import 'babel-polyfill'
import fs from 'fs'
import gulp from 'gulp'
import babel from 'gulp-babel'
import nodemon from 'gulp-nodemon'
import webpack from 'webpack'
import gutil from 'gulp-util'
import rm from 'rimraf'
import ignore from 'gulp-ignore'
import devWebpackConfig from './webpack.config.dev'

gulp.task('nodemon', () => {
  nodemon({
    script: 'cloud/app.js',
    watch: ['cloud'],
    ext: 'js html jade',
    env: { 'NODE_ENV': 'development' }
  })
})

function wp (config) {
  return new Promise(function (resolve, reject) {
    webpack(config, (err, stats) => {
      if(err) return reject(err)
  		gutil.log("[webpack:build]", stats.toString({
  			colors: true
  		}))
      resolve(stats)
    })
  })
}

gulp.task('webpack', async () => {
  var config = Object.create(devWebpackConfig)
  const stats = await wp(config).catch(err => {
    throw new gutil.PluginError("webpack:build", err)
  })
})

gulp.task('clean-webpack',  (cb) => {
  rm('./build', cb)
})

gulp.task('babel-server', () => {
  gulp.src('./src/server/**/*')
    .pipe(babel())
    .pipe(gulp.dest('./cloud'))
})

gulp.task('watch', () => {
  gulp.watch('./src/server/**/*', ['babel-server'])
  gulp.watch('./src/client/**/*', ['clean-webpack'])
})

gulp.task('build', ['babel-server', 'clean-webpack', 'webpack'])

gulp.task('default', ['build', 'watch', 'nodemon'])
