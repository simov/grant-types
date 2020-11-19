
import hapi, {PluginsStates} from 'hapi'
import session from 'yar'

import grant, {GrantConfig, GrantResponse} from 'grant'

import json from '../config.json'
const config: GrantConfig = json

interface HapiState extends PluginsStates {grant: {response?: GrantResponse}}

const app = new hapi.Server({host: 'localhost', port: 3000})

app.ext('onPostHandler', (req, res) => {
  const state = req.plugins as HapiState
  const response = state.grant.response
  return res
    .response(JSON.stringify(response, null, 2))
    .header('content-type', 'text/plain')
})

;(async () => {
  await app.register([
    {plugin: session, options: {
      name: 'grant',
      cookieOptions: {password: '01234567890123456789012345678901', isSecure: false}}},
    {plugin: grant.hapi(config)}
  ])
  await app.start()
})()
