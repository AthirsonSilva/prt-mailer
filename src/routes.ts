import { Router } from 'express'
import { TARGET_EMAIL, contactEmail } from './server'

export const router = Router()

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
