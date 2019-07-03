let conversationVue, docmodal

document.addEventListener('DOMContentLoaded', () => {
	conversationVue = new Vue({
		el: '#messages',
		data: {
			messages: [],
			doc: {
				name: '',
				owner: ''
			}
		},
		mounted: function () {
			docmodal = M.Modal.init(document.querySelector('#docmodal'))
		}
	})
})



if (annyang) {

	// var recognition = new webkitSpeechRecognition();
	// recognition.continuous = true;
	// recognition.lang = 'en-US';
	// recognition.interimResults = false;
	// recognition.maxAlternatives = 1;

	// recognition.onspeechend = function () {
		// recognition.stop();
	// }

	var synthesis = window.speechSynthesis
	var utterance = new SpeechSynthesisUtterance()
	var voices, lekhs
	setTimeout(() => {
		voices = synthesis.getVoices()
		lekha = voices.filter(voice => voice.name == 'Lekha')[0]
		utterance.voice = lekha
	}, 1000)
	var voices = synthesis.getVoices()
	var lekha = voices.filter(voice => voice.name == 'Lekha')[0]
	utterance.voice = lekha
	console.log(synthesis)
	utterance.pitch = 1
	utterance.rate = 0.9



	// let macmsg = {
	// 	from: 'machine',
	// 	text: ''
	// }

	let processApplication = false
	let applicationStates = ['name', 'from', 'to', 'nature', 'purpose']
	let applicationState = 0
	let applicationParameters = {
		name: '',
		number: '',
		fromdate: '',
		todate: '',
		purpose: '',
		nature: ''
	}

	// recognition.onresult = function (ev) {

		// let recogtext = ev.results[ev.results.length - 1][0].transcript

		// conversationVue.messages.push({
		// 	from: 'user',
		// 	text: recogtext
		// })

		// console.log(recogtext);



		// if (processApplication) {
		// 	let macmsg = {
		// 		from: 'machine',
		// 		text: ''
		// 	}

		// 	recognition.stop()

		// 	switch (applicationState) {
		// 		case 0:
		// 			applicationParameters.name = recogtext;

		// 			macmsg.text = `from when do want to go on leave?`
		// 			conversationVue.messages.push(macmsg)
		// 			utterance.text = `आप छुट्टी कबसे लेना चाहते है?`
		// 			utterance.voice = lekha

		// 			synthesis.speak(utterance)
		// 			applicationState++
		// 			break;
		// 		case 1:
		// 			applicationParameters.from = recogtext;

		// 			macmsg.text = `upto when do want to go on leave?`
		// 			conversationVue.messages.push(macmsg)
		// 			utterance.text = `आप छुट्टी कब तक लेना चाहते है?`
		// 			utterance.voice = lekha

		// 			synthesis.speak(utterance)
		// 			applicationState++
		// 			break;
		// 		case 2:
		// 			applicationParameters.to = recogtext;

		// 			macmsg.text = `what is the nature of leave?`
		// 			conversationVue.messages.push(macmsg)
		// 			utterance.text = `छुट्टी किस प्रकार की है?`
		// 			utterance.voice = lekha

		// 			synthesis.speak(utterance)
		// 			applicationState++
		// 			break;
		// 		case 3:
		// 			applicationParameters.nature = recogtext;

		// 			macmsg.text = `what is the purpose of leave?`
		// 			conversationVue.messages.push(macmsg)
		// 			utterance.text = `आप छुट्टी क्यों लेना चाहते है?`
		// 			utterance.voice = lekha

		// 			synthesis.speak(utterance)
		// 			applicationState++
		// 			break;
		// 		case 4:
		// 			applicationParameters.purpose = recogtext;
		// 			window.location.href = `http://localhost:3000/leaveapplicationprint?name=${applicationParameters.name}&from=${applicationParameters.from}&to=${applicationParameters.to}&nature=${applicationParameters.nature}&purpose=${applicationParameters.purpose}`
		// 			recognition.stop()
		// 			break;


		// 		default:
		// 			break

		// 	}
		// 	recognition.start()


		// }
		// recognition.stop()
		// recognition.start()
	// }



	// Add our commands to annyang

	annyang.addCommands({
		hello: function () {
			// alert('Hello world!')
			let msg = {
				from: 'machine',
				text: 'Hi!'
			}
			conversationVue.messages.push(msg)
		},
		'show me :doc': function (doc) {
			doc = doc.toLowerCase()
			fetch(`/api/document/${doc}`)
				.then(res => res.json())
				.then(data => {


					if (data.error) {
						let macmsg = {
							from: 'machine',
							text: ''
						}
						macmsg.text = "Sorry, document not found."
						utterance.text = macmsg.text
						utterance.voice = lekha

						synthesis.speak(utterance)
						conversationVue.messages.push(macmsg)
					} else {
						conversationVue.doc = data
						docmodal.open()
					}

					// alert(JSON.stringify(data))
				})
				.catch(err => {
					console.error(err)
				})
		},
		'(fill) :type application (bharo)': leaveApplication,
		'mujhe chutti chahiye': leaveApplication,
	})

	function leaveApplication (type) {

		console.log(type)

		processApplication = true
		conversationVue.messages.push({
			from: 'machine',
			text: `Filling ${type} application`
		})

		conversationVue.messages.push({
			from: 'machine',
			text: `What is your name?`
		})
		utterance.text = `आपका नाम क्या है?`
		annyang.abort()
		synthesis.speak(utterance)
		setTimeout(()=>{annyang.resume()},1500)

	}

	annyang.addCallback('result', function (phrases) {
		// console.log('I think the user said: ', phrases[0])
		
		// console.log(
		// 	'But then again, it could be any of the following: ',
		// 	phrases
		// )



		// =====


		let recogtext = phrases[0]

		conversationVue.messages.push({
			from: 'user',
			text: recogtext
		})

		console.log(recogtext);

		annyang.abort()

		if (processApplication) {
			let macmsg = {
				from: 'machine',
				text: ''
			}

			

			switch (applicationState) {
				case 0:
					applicationParameters.name = recogtext;

					macmsg.text = `from when do want to go on leave?`
					conversationVue.messages.push(macmsg)
					utterance.text = `आप छुट्टी कबसे लेना चाहते है?`
					utterance.voice = lekha

					synthesis.speak(utterance)
					applicationState++
					break;
				case 1:
					applicationParameters.from = recogtext;

					macmsg.text = `upto when do want to go on leave?`
					conversationVue.messages.push(macmsg)
					utterance.text = `आप छुट्टी कब तक लेना चाहते है?`
					utterance.voice = lekha

					synthesis.speak(utterance)
					applicationState++
					break;
				case 2:
					applicationParameters.to = recogtext;

					macmsg.text = `what is the nature of leave?`
					conversationVue.messages.push(macmsg)
					utterance.text = `छुट्टी किस प्रकार की है?`
					utterance.voice = lekha

					synthesis.speak(utterance)
					applicationState++
					break;
				case 3:
					applicationParameters.nature = recogtext;

					macmsg.text = `what is the purpose of leave?`
					conversationVue.messages.push(macmsg)
					utterance.text = `आप छुट्टी क्यों लेना चाहते है?`
					utterance.voice = lekha

					synthesis.speak(utterance)
					applicationState++
					break;
				case 4:
					applicationParameters.purpose = recogtext;
					window.location.href = `http://localhost:3000/leaveapplicationprint?name=${applicationParameters.name}&from=${applicationParameters.from}&to=${applicationParameters.to}&nature=${applicationParameters.nature}&purpose=${applicationParameters.purpose}`
					recognition.stop()
					break;


				default:
					break

			}
			setTimeout(()=>{annyang.resume()},1500)


		}


		// =====

	})

	// Tell KITT to use annyang
	SpeechKITT.annyang()

	// Define a stylesheet for KITT to use
	SpeechKITT.setStylesheet(
		'/css/flat-pumpkin.css'
	)
	// SpeechKITT.displayRecognizedSentence({
	// 	newState: true
	// })

	// Render KITT's interface
	SpeechKITT.vroom()
}
