const lineReader = require("line-reader")
const async = require("async")
module.exports = function (Model) {
    class scan extends Model {
        constructor(){
            super('codes')
        }
        set project(_project_name) {
            this._project_name = _project_name
        }

        aftersvn(err, updatefiles, deletefiles, finished_callback) {
            if (err) return
            deletefiles.forEach(file => {
                this.delete({'project': this._project_name, 'filepath': file})
            })
            async.each(updatefiles, (file, callback) => {
                this.delete({'project': this._project_name, 'filepath': file})
                   this.scanfile(file, (err, file_contents) => {
                    if (err == null) {
                        for (let keyword in file_contents) {
                            for (var i in file_contents[keyword]) {
                                this.create({
                                    'project': this._project_name,
                                    'keyword': keyword,
                                    'filepath': file,
                                    'linenum': file_contents[keyword][i].line,
                                    'contents': file_contents[keyword][i].fiveline
                                })
                            }
                        }
                    }
                    callback()
                })
            }, err => {
                if (finished_callback !== undefined && typeof finished_callback === 'function') {
                    finished_callback()
                }
            })
        }

        scanfile(filepath, callback) {
            let pattern = /\/\/.*?@(\w+?)@(.*)/
            let fiveline = []
            let store = {}
            let linenum = 0
            let expertline = 19
            let pos = Math.floor(expertline / 2)
            lineReader.eachLine(filepath, {encoding: 'utf8'}, (line, last, nextline) => {
                linenum++
                fiveline.push(line)
                if (fiveline.length > expertline) fiveline.shift()
                let _line = fiveline[pos]
                if (fiveline.length > pos && _line.match(pattern)) {
                    let match = _line.match(pattern)
                    if (store[match[1]] == undefined) store[match[1]] = []
                    store[match[1]].push({
                        "line": linenum - pos,
                        "content": match[2],
                        "fiveline": fiveline.join("\n")
                    })
                }
                if (last) {
                    if (store == {}) {
                        callback(filepath + " had no contents.")
                    } else {
                        callback(null, store)
                    }
                } else {
                    nextline()
                }
            })
        }
    }
    return scan
}