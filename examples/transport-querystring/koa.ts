
import koa from 'koa'
import session from 'koa-session'

import grant, {GrantConfig, GrantResponse} from 'grant'

import json from './config.json'
const config: GrantConfig = json

const app = new koa()
app
  .use(session(app))
  .use(grant.koa(config))
  .use(async (ctx) => {
    const response: GrantResponse = ctx.query
    ctx.body = JSON.stringify(response, null, 2)
  })
  .listen(3000)
