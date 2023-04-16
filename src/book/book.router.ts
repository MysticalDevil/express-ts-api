import express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as BookService from './book.server'
import { formatResponse } from '../middlewares/response.format'

export const bookRouter = express.Router()

// GET: List all the books
bookRouter.get('/', async (request: Request, response: Response) => {
  try {
    const books = await BookService.listBooks()
    return response.status(200).json(formatResponse(books, null, 200))
  } catch (error: any) {
    return response.status(500).json(formatResponse(null, error.message, 500))
  }
})

// GET: A book based on the id
bookRouter.get('/:id', async (request: Request, response: Response) => {
  const id = parseInt(request.params.id)
  try {
    const book = await BookService.getBook(id)
    if (book) {
      return response.status(200).json(formatResponse(book, null, 200))
    }
    return response.status(404).json(formatResponse(null, 'Book could not be found', 404))
  } catch (error: any) {
    return response.status(500).json(formatResponse(null, error.message, 500))
  }
})

// POST: Create a new book
bookRouter.post(
  '/',
  body('title').isString(),
  body('authorId').isInt(),
  body('datePublished').isDate().toDate(),
  body('isFiction').isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json(formatResponse(null, errors.array(), 400))
    }

    try {
      const book = request.body
      const newBook = await BookService.createBook(book)
      return response.status(201).json(formatResponse(newBook, null, 201))
    } catch (error: any) {
      return response.status(500).json(formatResponse(null, error.message, 500))
    }
  }
)

// PUT: Update book
bookRouter.put(
  '/:id',
  body('title').isString(),
  body('authorId').isInt(),
  body('datePublished').isDate().toDate(),
  body('isFiction').isBoolean(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json(formatResponse(null, errors.array(), 400))
    }

    const id: number = parseInt(request.params.id)
    try {
      const book = request.body
      const updatedBook = await BookService.updateBook(book, id)
      return response.status(201).json(formatResponse(updatedBook, null, 201))
    } catch (error: any) {
      return response.status(500).json(formatResponse(null, error.message, 500))
    }
  }
)

// DELETE: Delete book
bookRouter.delete('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id)
  try {
    await BookService.deleteBook(id)
    return response.status(204).json(formatResponse('Book was successfully deleted', null, 204))
  } catch (error: any) {
    return response.status(500).json(formatResponse(null, error.message, 500))
  }
})
