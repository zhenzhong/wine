const svnlib = require("node-svn-ultimate")
const fs = require("fs")

module.exports = function (Model) {
    class svn {
        set suffix(val) {
            this._suffix = val
        }

        job(source_path, svn_options, aftersvn) {
            let svn_args = {
                username: svn_options.username,
                password: svn_options.password,
                force: true
            }
            let svn_cb = (err, data) => {
                if (err) {
                    callback(err)
                } else {
                    this._refill(data, aftersvn)
                }
            }
            if (fs.existsSync(source_path)) {
                svnlib.commands.update(source_path, svn_args, svn_cb)
            } else {
                svnlib.commands.checkout(svn_options.url, source_path, svn_args, svn_cb)
            }
        }

        _refill(data, callback) {
            let result = data.split("\n")
            let updatefiles = []
            let deletefiles = []
            for (let k in result) {
                if (this._suffix.indexOf(result[k].substr(result[k].lastIndexOf(".")).trim()) > -1) {
                    let match = result[k].match(/^(A|G|D|U|R)\s+(.*)/)
                    if (match) {
                        if (match[1] == "D") {
                            deletefiles.push(match[2])
                        } else {
                            updatefiles.push(match[2])
                        }
                    }
                }
            }
            callback(null, updatefiles, deletefiles)
        }
    }

    return svn
}