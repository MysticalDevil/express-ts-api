import express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as AuthorService from './author.server'
import { formatResponse } from '../middlewares/response.format'

export const authorRouter = express.Router()

// GET: List of all authors
authorRouter.get('/', async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.listAuthors()
    return response.status(200).json(formatResponse(authors, null, 200))
  } catch (error: any) {
    return response.status(500).json(formatResponse(null, error.message, 500))
  }
})

// GET: A single author by id
authorRouter.get('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10)
  try {
    const author = await AuthorService.getAuthor(id)
    if (author) {
      return response.status(200).json(formatResponse(author, null, 200))
    }
    return response.status(404).json(formatResponse(null, 'Author could not found', 404))
  } catch (error: any) {
    return response.status(500).json(formatResponse(null, error.message, 500))
  }
})

// POST: Create a author
// Params: firstName, lastName
authorRouter.post('/', body('firstName').isString(), body('lastName').isString(), async (request: Request, response: Response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return response.status(400).json(formatResponse(null, errors.array(), 400))
  }

  try {
    const author = request.body
    const newAuthor = await AuthorService.createAuthor(author)
    return response.status(201).json(formatResponse(newAuthor, null, 201))
  } catch (error: any) {
    return response.status(500).json(formatResponse(null, error.message, 500))
  }
})

// PUT: Update an author based on the id
authorRouter.put('/:id', body('firstName').isString(), body('lastName').isString(), async (request: Request, response: Response) => {
  const errors = validationResult(request)
  if (!errors.isEmpty()) {
    return response.status(400).json(formatResponse(null, errors.array(), 400))
  }

  const id: number = parseInt(request.params.id, 10)

  try {
    const author = request.body
    const updateAuthor = await AuthorService.updateAuthor(author, id)
    return response.status(201).json(formatResponse(updateAuthor, null, 201))
  } catch (error: any) {
    return response.status(500).json(formatResponse(null, error.message, 500))
  }
})

// DELETE: Delete an author based on the id
authorRouter.delete('/:id', async (request: Request, response: Response) => {
  const id = parseInt(request.params.id)
  try {
    await AuthorService.deleteAuthor(id)
    return response.status(204).json(formatResponse(null, null, 204))
  } catch (error: any) {
    return response.status(500).json(formatResponse(null, error.message, 500))
  }
})
