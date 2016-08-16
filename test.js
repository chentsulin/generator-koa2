'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var pwd = path.resolve('./');


describe('generator', function() {
  this.timeout(60000);

  beforeEach(function(cb) {
    var deps = ['../app'];

    helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
      if (err) return cb(err);
      this.generator = helpers.createGenerator('koa2:app', deps, null, { skipInstall: true });
      cb();
    }.bind(this));
  });

  afterEach(function() {
    process.chdir(pwd);
  });

  it('generates expected files', function(cb) {
    var expected = [
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.eslintrc.json',
      '.eslintignore',
      '.babelrc',
      'CHANGELOG.md',
      'LICENSE',
      'package.json',
      'README.md',
      'server.js',
      'router.js',
      path.join('bin', 'run'),
      path.join('lib', 'middlewares', 'finalHandler.js'),
      path.join('public', '.keep'),
      path.join('views', 'error', '404.html'),
      path.join('views', 'error', 'error.html'),
      path.join('views', 'index.html'),
    ];

    helpers.mockPrompt(this.generator, {
      moduleName: 'test',
      githubUsername: 'test',
      website: 'test.com',
      flow: false
    });

    this.generator.run(function() {
      assert.file(expected);
      cb();
    });
  });
});
