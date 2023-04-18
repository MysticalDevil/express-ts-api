import { db } from '../src/utils/db.server'

type Author = {
  firstName: string
  lastName: string
}

type Book = {
  title: string
  isFiction: boolean
  datePublished: Date
}

async function seed() {
  await Promise.all(
    genAuthors().map(author => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName
        }
      })
    })
  )

  await Promise.all(
    genBooks().map(book => {
      const { title, isFiction, datePublished } = book
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: Math.floor(Math.random() * 4) + 1
        }
      })
    })
  )
}

seed()

function genAuthors(): Array<Author> {
  return [
    {
      firstName: "John",
      lastName: "Doe"
    },
    {
      firstName: "Jane",
      lastName: "Doe"
    },
    {
      firstName: "Bob",
      lastName: "Smith"
    },
    {
      firstName: "Alice",
      lastName: "Johnson"
    },
    {
      firstName: "David",
      lastName: "Williams"
    },
    {
      firstName: "Sarah",
      lastName: "Taylor"
    },
    {
      firstName: "Michael",
      lastName: "Brown"
    },
    {
      firstName: "Emily",
      lastName: "Davis"
    },
    {
      firstName: "James",
      lastName: "Wilson"
    },
    {
      firstName: "Jessica",
      lastName: "Lee"
    }
  ]
}

function genBooks(): Array<Book> {
  return [
    {
      title: 'To Kill a Mockingbird',
      isFiction: true,
      datePublished: new Date('1960-07-11'),
    },
    {
      title: '1984',
      isFiction: true,
      datePublished: new Date('1949-06-08'),
    },
    {
      title: 'The Great Gatsby',
      isFiction: true,
      datePublished: new Date('1925-04-10'),
    },
    {
      title: 'The Catcher in the Rye',
      isFiction: true,
      datePublished: new Date('1951-07-16'),
    },
    {
      title: 'The Lord of the Rings',
      isFiction: true,
      datePublished: new Date('1954-07-29'),
    },
    {
      title: 'Pride and Prejudice',
      isFiction: true,
      datePublished: new Date('1813-01-28'),
    },
    {
      title: 'Animal Farm',
      isFiction: true,
      datePublished: new Date('1945-08-17'),
    },
    {
      title: 'The Hitchhiker\'s Guide to the Galaxy',
      isFiction: true,
      datePublished: new Date('1979-10-12'),
    },
    {
      title: 'The Da Vinci Code',
      isFiction: true,
      datePublished: new Date('2003-03-18'),
    },
    {
      title: 'The Origin of Species',
      isFiction: false,
      datePublished: new Date('1859-11-24'),
    },
    {
      title: 'The Alchemist',
      isFiction: true,
      datePublished: new Date('1988-01-01'),
    },
    {
      title: 'The Lean Startup',
      isFiction: false,
      datePublished: new Date('2011-09-13'),
    },
    {
      title: 'The Girl on the Train',
      isFiction: true,
      datePublished: new Date('2015-01-13'),
    },
    {
      title: 'The Power of Now',
      isFiction: false,
      datePublished: new Date('1997-09-29'),
    },
    {
      title: 'Gone Girl',
      isFiction: true,
      datePublished: new Date('2012-06-05'),
    },
    {
      title: 'Thinking, Fast and Slow',
      isFiction: false,
      datePublished: new Date('2011-10-25'),
    },
    {
      title: 'The Immortal Life of Henrietta Lacks',
      isFiction: false,
      datePublished: new Date('2010-02-02'),
    },
    {
      title: 'The Hunger Games',
      isFiction: true,
      datePublished: new Date('2008-09-14'),
    },
    {
      title: 'Sapiens: A Brief History of Humankind',
      isFiction: false,
      datePublished: new Date('2011-05-15'),
    },
    {
      title: 'The Hobbit',
      isFiction: true,
      datePublished: new Date('1937-09-21'),
    },
  ]
}
