const markdown = require('markdown-it')()
const fs = require("fs")
class main {
    async index(ctx) {
        let mdfile = ctx.app.config.markdown + '/index.md'
        let result = fs.readFileSync(mdfile, 'utf8')
        let modify = fs.statSync(mdfile)
        modify = new Date(modify['mtime']).toLocaleString()
        await ctx.render('welcome', {
            'TITLE' : 'WINE',
            'APPTITLE' : ctx.app.config.apptitle,
            'CONTENTS': markdown.render(result),
            'MODIFY' : modify
        })
    }
}

module.exports = main