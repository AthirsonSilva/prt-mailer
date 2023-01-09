const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const router = express.Router()
require('dotenv').config({ path: './.env.local' })

// server used to send send emails
const app = express()

app.use(cors())
app.use(express.json())
app.use('/', router)

app.listen(5000, () => console.log('Server Running'))

try {
	const contactEmail = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'athirsonarceus@gmail.com',
			pass: 'eyyvwyheilecpabw'
		}
	})

	contactEmail.verify((error) => {
		if (error) {
			console.log(error)
		}
	})
} catch (error) {
	console.log(error)
}

router.post('/contact', (request, response) => {
	try {
		const { firstName, lastName, email, phone, message } = request.body

		const mail = {
			from: email,
			to: 'athirsonarceus@gmail.com',
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
