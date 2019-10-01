let router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/about', (req, res) => {
	res.render('about')
})

// Controllers -----

const ayudhController = require('./controllers/ayudhController')

router.get('/api', (req, res) => {
    res.send('hello from api')
})

router.get('/api/document/:name', ayudhController.documentDetails_get)

router.get('/leaveapplicationprint', ayudhController.printApplication)

router.get('/leaveapplication', (req, res) => {
	res.render('leaveapplication')
})

router.get('/annyang', (req, res) => {
	res.render('annyang')
})


module.exports = router


