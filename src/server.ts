import cors from 'cors'
import * as dotenv from 'dotenv'
import express, { json } from 'express'
import { createTransport } from 'nodemailer'
import { router } from './routes'

dotenv.config()

const app = express()
export const TARGET_EMAIL = process.env.EMAIL_ADDRESS
export const TARGET_PASSWORD = process.env.EMAIL_PASSWORD
export const contactEmail = createTransport({
	service: 'gmail',
	auth: {
		user: TARGET_EMAIL,
		pass: TARGET_PASSWORD
	}
})
const PORT = process.env.PORT || 3000
console.log([TARGET_EMAIL, TARGET_PASSWORD, PORT])

app.use(cors())
app.use(json())
app.use('/', router)

app.listen(PORT, () => console.log('Server Running on port: ' + PORT))

contactEmail.verify((error) => {
	if (error) {
		console.log(error)
	}
})
