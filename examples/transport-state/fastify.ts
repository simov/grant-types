
import fastify, {FastifyReply} from 'fastify'
import session from 'fastify-session'
import cookie from 'fastify-cookie'

import grant, {GrantConfig, GrantResponse} from 'grant'

import json from '../config.json'
const config: GrantConfig = json

interface FastifyResponse extends FastifyReply {
  grant: {response?: GrantResponse}
}

fastify()
  .addHook('onSend', async (req, res, payload) => {
    const reply = res as FastifyResponse
    const response = reply.grant.response
    res.header('content-type', 'text/plain')
    payload = JSON.stringify(response, null, 2)
    return payload
  })
  .register(cookie)
  .register(session, {secret: '01234567890123456789012345678912', cookie: {secure: false}})
  .register(grant.fastify(config))
  .listen(3000)
