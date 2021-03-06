const fs = require("fs")
const ini = require('ini')

class project {
    async index(ctx) {
        if (ctx.query.project == undefined) throw new createError.NotFound()
        let project_file = ctx.app.config.markdown + '/' + ctx.query.project + '.ini'
        let result, modify
        let keywordsum = {}
        try {
            result = fs.readFileSync(project_file, 'utf8')
            modify = fs.statSync(project_file)
            modify = new Date(modify['mtime']).toLocaleString()
        } catch (err) {
            throw new createError.NotFound()
        }
        let project_info = ini.parse(result)
        let project_obj = ctx.model()
        project_obj.table = 'codes'
        let project_data = await project_obj.findAll({
            'project': ctx.query.project
        })

        if (project_data) {
            for (let data of project_data) {
                keywordsum[data.keyword] = (keywordsum[data.keyword] == undefined) ? 1 : keywordsum[data.keyword] + 1
            }
        }

        await ctx.render('project', {
            'PRONAME': ctx.query.project,
            'TITLE': project_info.project.name,
            'APPTITLE' : ctx.app.config.apptitle,
            'CONTENTS': project_data,
            'KEYWORDS': project_info.keyword,
            'KEYWORDS_COUNT': keywordsum,
            'MODIFY': modify
        })
    }
}

module.exports = project