const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const router = express.Router()
require('dotenv').config({ path: './.env.local' })

// server used to send send emails
const app = express()
const TARGET_EMAIL = process.env.EMAIL_ADDRESS || 'athirsonarceus@gmail.com'
const TARGET_PASSWORD = process.env.EMAIL_PASSWORD || 'eyyvwyheilecpabw'
const PORT = process.env.PORT || 5000
console.log([TARGET_EMAIL, TARGET_PASSWORD, PORT])

app.use(cors())
app.use(express.json())
app.use('/', router)

app.listen(PORT, () => console.log('Server Running on port: ' + PORT))

const contactEmail = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: TARGET_EMAIL,
		pass: TARGET_PASSWORD
	}
})

contactEmail.verify((error) => {
	if (error) {
		console.log(error)
	}
})

router.get('/', (request, response) => {
	response.send('Hello World! This is the server for my portfolio.')
})

router.post('/contact', (request, response) => {
	try {
		const { firstName, lastName, email, phone, message } = request.body

		const mail = {
			from: email,
			to: TARGET_EMAIL,
			subject: 'Contact Form Submission - Portfolio',
			html: `<p>Name: ${firstName} ${lastName}</p>
           <p>From: ${email} - ${phone}</p>
           ${message}`
		}

		contactEmail.sendMail(mail, (error) => {
			if (error) {
				response.json(error)
			} else {
				response.json({
					code: 200,
					status: 'Message Sent Successfully!',
					mail
				})
			}
		})
	} catch (error) {
		console.log(error)
	}
})
