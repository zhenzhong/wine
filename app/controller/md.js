const markdown = require('markdown-it')()
const fs = require("fs")
const createError = require('http-errors')

class md {
    async index(ctx) {
        if (ctx.query.page == undefined) throw new createError.NotFound()
        let mdfile = ctx.app.config.markdown + '/' + ctx.query.page + '.md'
        let result, modify
        try {
            result = fs.readFileSync(mdfile, 'utf8')
            modify = fs.statSync(mdfile)
            modify = new Date(modify['mtime']).toLocaleString()
        } catch (err) {
            throw new createError.NotFound()
        }
        let title = /^#\s*(.*)/.exec(result)
        if (title) {
            title = title[1]
        } else {
            title = ctx.query.page.replace(".md", "").replace("/", "")
        }
        await ctx.render('markdown', {
            'TITLE': title,
            'APPTITLE' : ctx.app.config.apptitle,
            'CONTENTS': markdown.render(result),
            'MODIFY': modify
        })
    }
}

module.exports = md