
import fastify, {FastifyRequest} from 'fastify'
import session from 'fastify-session'
import cookie from 'fastify-cookie'

import grant, {GrantConfig, GrantSession, GrantProvider} from 'grant'

import json from './config.json'
const config: GrantConfig = json

interface Request extends FastifyRequest {
  grant: {dynamic?: GrantProvider}
}

fastify()
  .addHook('preHandler', async (req, res) => {
    const request = req as Request
    request.grant = {dynamic: {scope: ['openid']}}
  })
  .register(cookie)
  .register(session, {secret: '01234567890123456789012345678912', cookie: {secure: false}})
  .register(grant.fastify(config))
  .route({method: 'GET', url: '/hello', handler: async (req, res) => {
    const session: GrantSession = req.session.grant
    const response = session.response
    res.send(JSON.stringify(response, null, 2))
  }})
  .listen(3000)
