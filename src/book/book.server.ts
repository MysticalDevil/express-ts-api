import type { Author } from '../author/author.server'
import { db } from '../utils/db.server'

type BookRead = {
  id: number
  title: string
  datePublished: Date
  isFiction: boolean
  author: Author
}

type BookWrite = {
  title: string
  datePublished: Date
  isFiction: boolean,
  authorId: number
}

const selectedBook = {
  id: true,
  title: true,
  datePublished: true,
  isFiction: true,
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true
    }
  }
}

export const listBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select: selectedBook
  })
}

export const getBook = async (id: number): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: {
      id,
    },
    select: selectedBook
  })
}

export const createBook = async (book: BookWrite): Promise<BookRead> => {
  const { title, authorId, datePublished, isFiction } = book
  const parseDate: Date = new Date(datePublished)
  return db.book.create({
    data: {
      title,
      authorId,
      isFiction,
      datePublished: parseDate
    },
    select: selectedBook
  })
}

export const updateBook = async (book: BookWrite, id: number): Promise<BookRead> => {
  const { title, authorId, datePublished, isFiction } = book
  const parseDate: Date = new Date(datePublished)
  return db.book.update({
    where: {
      id
    },
    data: {
      title,
      authorId,
      isFiction,
      datePublished: parseDate
    },
    select: selectedBook
  })
}

export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete({
    where: {
      id
    }
  })
}
