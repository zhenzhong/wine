'use strict'

const k = require('k')
const lodash = require('lodash');
const Koa = require('koa');
const app = new Koa()
const config = require(__dirname + '/app/config.js')(__dirname)

module.exports = (_config) => {
    return k(app, lodash.merge(config, _config))
}


