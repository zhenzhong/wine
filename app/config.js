const lodash = require('lodash')
const env = process.env.NODE_ENV || 'development'

module.exports = (baseDir) => {
    let config = {
        'default': {
            'suffix' : [".js", ".java", ".go", ".php"],
            'router_map': {
                '/md/:page': 'md/index',
                '/pro/:project': 'project/index',
                '/hook/:proname': 'hook/index',
                '/wait/:proname': 'hook/wait',
                '/index.html': 'main/index',
                '/': 'main/index',
            },
            'view_opts' : {
                'map' : {
                    html: 'twig'
                }
            },
            'public_path': baseDir + '/public',
            'controller_path': baseDir + '/app/controller',
            'view_path': baseDir + '/app/view',
            'model_path': baseDir + '/app/model',
        },
        'development': {},
        'production': {}
    }
    return lodash.assign(config.default, config[env], {'default': {'env': env}})
}