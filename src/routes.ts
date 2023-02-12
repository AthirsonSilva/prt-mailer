import { Request, Response, Router } from 'express'
import { TARGET_EMAIL, contactEmail } from './server'

export const router = Router()

router.get('/', (request: Request, response: Response) => {
	response.send('Hello World! This is the server for my portfolio.')
})

router.post('/', (request: Request, response: Response) => {
	try {
		const { ownerRef, fromEmail, bodyEmail } = request.body

		const mail = {
			from: fromEmail,
			to: TARGET_EMAIL,
			subject: 'Portfolio - Email from: ' + ownerRef,
			html: `
           ${bodyEmail}
					 \n\n
					 <p>Message sent from: ${ownerRef}</p>
					 `
		}

		contactEmail.sendMail(mail, (error: unknown) => {
			if (error) {
				response.json(error)
			} else {
				response.status = 201 as any
				response.json(mail)
			}
		})
	} catch (error) {
		console.log(error)
	}
})
