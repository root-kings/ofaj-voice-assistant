let router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/about', (req, res) => {
	res.render('about')
})

router.get('/leaveapplication', (req, res) => {
	res.render('leaveapplication')
})

router.get('/leaveapplicationprint', (req, res) => {
	let sendableObject = req.query || {
		name:'Tusar Pandey',
		number:'',
		fromdate:'2019-07-03',
		todate:'2019-07-07',
		purpose:'Going to hometown',
		nature:'PL'
	}
	res.render('leaveapplicationprint',sendableObject)
})


router.get('/annyang', (req, res) => {
	res.render('annyang')
})

// Controllers -----

const ayudhController = require('./controllers/ayudhController')

router.get('/api', (req, res) => {
    res.send('hello from api')
})

router.get('/api/document/:name', ayudhController.documentDetails_get)



module.exports = router


