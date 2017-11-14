'use strict'

const wine = require("../index.js")

const config = {
    'env': 'development',
    'markdown' : process.cwd() + '/md',
    'mysql': {
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'test'
    },
    'apptitle' : 'Wiki 你的代码'
}

wine(config).listen(3000)