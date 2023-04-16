import { STATUS_CODES } from 'http'

interface IResponse {
  code: number
  status: string
  data: any
  errors: any
}

export function formatResponse(data: any = {}, errors: any = {}, code = 200): IResponse {
  return {
    code,
    status: STATUS_CODES[code] || 'unknown',
    data,
    errors
  }
}
