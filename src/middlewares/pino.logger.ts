import * as PinoHttp from 'pino-http'
import * as Pino from 'pino'
import path from 'path'

import { LOG_LEVEL } from '../utils/env.server'

const logDir = path.join(__dirname, '../../storage/logs')

const transport = Pino.pino.transport({
  targets: [
    {
      level: 'error',
      target: 'pino/file',
      options: {
        desination: `${logDir}/errors.log`,
        mkdir: true,
        append: true,
      }
    },
    {
      level: 'warn',
      target: 'pino/file',
      options: {
        desination: `${logDir}/warns.log`,
        mkdir: true,
        append: true,
      }
    },
    {
      level: 'info',
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    },
    {
      level: 'debug',
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    },
  ]
})


const logger = Pino.pino({
  level: LOG_LEVEL || 'info',
  formatters: {
    level(label) {
      return { level: label }
    }
  },
})

export const httpLogger = PinoHttp.pinoHttp({
  logger,
  serializers: {
    req: Pino.stdSerializers.req,
    res: Pino.stdSerializers.res,
    err: Pino.stdSerializers.err
  },
  // Define a custom logger level
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn'
    } else if (res.statusCode >= 500 || err) {
      return 'error'
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent'
    }
    return 'info'
  },
  transport
})
