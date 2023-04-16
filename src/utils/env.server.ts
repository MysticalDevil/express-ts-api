import * as dotenv from 'dotenv'

dotenv.config()

export const LOG_LEVEL: string | undefined = process.env.LOG_LEVEL
export const PORT: string | undefined = process.env.PORT

if (PORT === undefined || LOG_LEVEL === undefined) {
  process.exit(1)
}
