const fs = require("fs")
const createError = require('http-errors')
const ini = require('ini')

class hook {
    constructor(ctx) {
        this._svn = ctx.model('svn')
        this._scan = ctx.model('scan')
    }

    async wait(ctx, next) {
        let inifile = this.read(ctx)
        await new Promise((resolve, reject) => {
            this._svn.job(process.cwd() + '/tmp/' + ctx.query.proname, {
                'url': inifile.project.repository,
                'username': inifile.project.username,
                'password': inifile.project.password,
            }, this._scan.aftersvn.bind(this._scan))
            resolve()
        })
        ctx.body = "ok"
    }

    async index(ctx) {
        let inifile = this.read(ctx)
        this._svn.job(process.cwd() + '/tmp/' + ctx.query.proname, {
            'url': inifile.project.repository,
            'username': inifile.project.username,
            'password': inifile.project.password,
        }, this._scan.aftersvn.bind(this._scan))
        ctx.body = "ok"
    }

    read(ctx) {
        if (ctx.query.proname == undefined) throw new createError.NotFound()
        let project_file = ctx.app.config.markdown + '/' + ctx.query.proname + '.ini'
        let result
        try {
            result = fs.readFileSync(project_file, 'utf8')
        } catch (err) {
            throw new createError.NotFound()
        }
        let inifile = ini.parse(result)
        this._scan.project = ctx.query.proname
        this._svn.suffix = ctx.app.config.suffix
        return inifile
    }

}

module.exports = hook