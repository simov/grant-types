
import hapi from 'hapi'
import session from 'yar'

import grant, {GrantConfig, GrantSession} from 'grant'

import json from './config.json'
const config: GrantConfig = json

const app = new hapi.Server({host: 'localhost', port: 3000})

app.route({method: 'GET', path: '/hello', handler: (req, res) => {
  const session: GrantSession = req.yar.get('grant')
  const response = session.response
  return res
    .response(JSON.stringify(response, null, 2))
    .header('content-type', 'text/plain')
}})

;(async () => {
  await app.register([
    {plugin: session, options: {
      name: 'grant',
      cookieOptions: {password: '01234567890123456789012345678901', isSecure: false}}},
    {plugin: grant.hapi(config)}
  ])
  await app.start()
})()
