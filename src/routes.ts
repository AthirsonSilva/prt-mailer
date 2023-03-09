import { Request, Response, Router } from 'express'
import { TARGET_EMAIL, contactEmail } from './server'

export const router = Router()

type EmailRequest = {
	ownerRef: string
	fromEmail: string
	bodyEmail: string
}

router.get('/', (request: Request, response: Response) => {
	response.send('Hello World! This is the server for my portfolio.')
})

router.post('/', (request: Request, response: Response) => {
	try {
		const { ownerRef, fromEmail, bodyEmail } = request.body as EmailRequest

		if (!ownerRef) {
			response.status = 400 as any
			response.json({
				error: 'You must provide a name.'
			})
			return
		} else if (!fromEmail) {
			response.status = 400 as any
			response.json({
				error: 'You must provide an email address.'
			})
			return
		} else if (!bodyEmail) {
			response.status = 400 as any
			response.json({
				error: 'You must provide a message.'
			})
			return
		}

		const mail = {
			from: fromEmail,
			to: TARGET_EMAIL,
			subject: 'Portfolio - Email from: ' + ownerRef,
			html: `
           ${bodyEmail}
					 \n\n
					 <p>Message sent from: ${ownerRef}</p>
					 \n\n
					 <p>Reply to: ${fromEmail}</p>
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
