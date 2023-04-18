import * as dotenv from 'dotenv'

dotenv.config()

export const LOG_LEVEL: string = process.env.LOG_LEVEL || 'warn'
export const PORT: string = process.env.PORT ?? '8000'
