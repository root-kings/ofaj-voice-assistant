const fs = require('fs')

exports.documentDetails_get = (req, res) => {
    let filename = req.params.name
    let filepath = __dirname + '/../data/documents/' + filename + '.json'
    fs.readFile(filepath, (err, file) => {
        if (err) return res.status(500).send({ error: err, message: 'Unable to openfile ' + filepath })

        let filecontent = JSON.parse(file)

        return res.send(filecontent)

    })
}