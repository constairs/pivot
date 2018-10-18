'use strict';

process.env.BABEL_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const webpack = require('webpack');
const rimraf = require('rimraf');

const { distSrc } = require('../config/paths');
const config = require('../config/webpack.config');

const compiler = webpack(config(process.env.NODE_ENV));

rimraf.sync(distSrc);

compiler.run((err, stats) => {
  if (err) {
    console.log();
    console.log(chalk`{bgRed.black  Failed to compile :( }`);
    console.log();
    process.exit(1);
  }
  const messages = stats.toJson();

  if (messages.errors.length) {
    if (messages.errors.length > 1) {
      messages.errors.length = 1;
    }
    console.log(new Error(messages.errors.join('\n\n')));
    console.log();
    console.log(chalk`{bgRed.black  Failed to compile :( }`);
    console.log();
  }

  if (!err && !stats.hasErrors()) {
    console.log(chalk`{bgGreen.black  Compiled successfully :) }`);
    console.log();
  }
});
