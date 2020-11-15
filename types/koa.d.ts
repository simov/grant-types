
import {Context as _Context} from 'koa'
import {Session as _Session} from 'koa-session'
import {GrantProvider, GrantSession, GrantResponse} from 'grant'

interface KoaSession extends _Session {
  grant: GrantSession
}

export interface KoaContext extends _Context {
  session: KoaSession,
  state: {
    grant: {
      dynamic?: GrantProvider
      response?: GrantResponse
    }
  }
}
