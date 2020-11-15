
import {Request as _Request, Response as _Response} from 'express'
import {Session as _Session} from 'express-session'
import {GrantProvider, GrantSession, GrantResponse} from 'grant'

/**
 * Express session
 */
interface Session extends _Session {
  grant: GrantSession
}

/**
 * Express request
 */
export interface ExpressRequest extends _Request {
  session: Session
}

/**
 * Express response
 */
export interface ExpressResponse extends _Response {
  locals: {
    grant: {
      dynamic?: GrantProvider
      response?: GrantResponse
    }
  }
}
