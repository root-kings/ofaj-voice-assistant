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

exports.printApplication = (req, res) => {
	let sendableObject = req.query || {
		name:'Tusar Pandey',
		number:'',
		fromdate:'2019-07-03',
		todate:'2019-07-07',
		purpose:'Going to hometown',
		nature:'PL'
	}
	res.render('leaveapplicationprint',sendableObject)
}