import express, { Application } from 'express'
import cors from 'cors'

import { authorRouter } from './author/author.router'
import { bookRouter } from './book/book.router'
import { httpLogger } from './middlewares/pino.logger'
import { PORT } from './utils/env.server'


const app: Application = express()

app.use(cors())
app.use(httpLogger)
app.use(express.json())

app.use('/api/authors', authorRouter)
app.use('/api/books', bookRouter)

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
