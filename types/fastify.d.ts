
import {Session as _Session, FastifyRequest as _FastifyRequest, FastifyReply as _FastifyResponse} from 'fastify'
import {GrantProvider, GrantSession, GrantResponse} from 'grant'

// TODO: this doesn't work
/**
 * Fastify session
 */
export interface Session extends _Session {
  grant: GrantSession
}

/**
 * Fastify request
 */
export interface FastifyRequest extends _FastifyRequest {
  session: Session,
  grant: {
    dynamic?: GrantProvider
  }
}

/**
 * Fastify response
 */
export interface FastifyResponse extends _FastifyResponse {
  grant: {
    response?: GrantResponse
  }
}
