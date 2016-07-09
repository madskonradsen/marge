import * as gulp from "gulp";
import * as runSequence from "run-sequence";
import {PROJECT_TASKS_DIR, SEED_TASKS_DIR} from "./tools/config";
import {loadTasks} from "./tools/utils";

const taskListing = require('gulp-task-listing');

loadTasks(SEED_TASKS_DIR);
loadTasks(PROJECT_TASKS_DIR);

gulp.task('help', taskListing);

// --------------
// Build dev.
gulp.task('build.dev', (done: any) =>
  runSequence(//'clean.dev',
//              'tslint',
//              'css-lint',
              'build.assets.dev',
              'project.build.html_css',
              'build.js.dev',
              'build.index.dev',
              done));

// --------------
// Build dev watch.
gulp.task('build.dev.watch', (done: any) =>
  runSequence('build.dev',
              'watch.dev',
              done));

// --------------
// Build e2e.
gulp.task('build.e2e', (done: any) =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'build.js.e2e',
              'build.index.dev',
              done));

// --------------
// Build prod.
gulp.task('build.prod', (done: any) =>
  runSequence('clean.prod',
              'tslint',
              'css-lint',
              'build.assets.prod',
              'project.build.html_css',
              'copy.js.prod',
              'build.js.prod',
              'build.bundles',
              'build.bundles.app',
              'build.index.prod',
              done));

// --------------
// Build test.
gulp.task('build.test', (done: any) =>
  runSequence('clean.dev',
              'tslint',
              'build.assets.dev',
              'project.build.js.test',
              'build.index.dev',
              done));

// --------------
// Build test watch.
gulp.task('build.test.watch', (done: any) =>
  runSequence('build.test',
              'watch.test',
              done));

// --------------
// Build tools.
gulp.task('build.tools', (done: any) =>
  runSequence('clean.tools',
              'build.js.tools',
              done));

// --------------
// Docs
gulp.task('docs', (done: any) =>
  runSequence('build.docs',
              'serve.docs',
              done));

// --------------
// Serve dev
gulp.task('serve.dev', (done: any) =>
  runSequence('build.dev',
              'server.start',
              'watch.dev',
              done));

// --------------
// Serve e2e
gulp.task('serve.e2e', (done: any) =>
  runSequence('build.e2e',
              'server.start',
              'watch.e2e',
              done));


// --------------
// Serve prod
gulp.task('serve.prod', (done: any) =>
  runSequence('build.prod',
              'server.prod',
              done));


// --------------
// Test.
gulp.task('test', (done: any) =>
  runSequence('build.test',
              'karma.start',
              done));

// --------------
// Desktop (Electron)

// Development
gulp.task('desktop', (done: any) =>
  runSequence('build.dev',
              'desktop.libs',
              'desktop.build',
              done));

// Release and Package

// TODO: integrate prod build into electron package
// gulp.task('desktop.prod', (done: any) =>
//   runSequence('build.prod',
//               'desktop.libs',
//               'desktop.build',
//               done));

gulp.task('desktop.mac', (done: any) =>
  runSequence('desktop',
              'desktop.package.mac',
              done));

gulp.task('desktop.windows', (done: any) =>
  runSequence('desktop',
              'desktop.package.windows',
              done));

gulp.task('desktop.linux', (done: any) =>
  runSequence('desktop',
              'desktop.package.linux',
              done));
