import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import pino from 'pino-http'

import { authorRouter } from './author/author.router'
import { bookRouter } from './book/book.router'

dotenv.config()

if (!process.env.PORT) {
  process.exit(1)
}

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

const PORT: number = parseInt(process.env.PORT as string, 10)

const app: Application = express()

app.use(cors())
app.use(logger)
app.use(express.json())

app.use('/api/authors', authorRouter)
app.use('/api/books', bookRouter)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
