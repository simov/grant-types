
import grant, {GrantConfig} from 'grant'
import json from './config.json'
const config: GrantConfig = json

const handler = grant.aws({
  config, session: {secret: 'grant'}
})

exports.handler = async (event) => {
  const {redirect, response} = await handler(event)
  return redirect || {
    statusCode: 200,
    headers: {'content-type': 'text/plain'},
    body: JSON.stringify(response, null, 2)
  }
}
