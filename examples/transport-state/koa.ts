
import koa from 'koa'
import session from 'koa-session'

import grant, {GrantConfig, GrantResponse} from 'grant'

import json from '../config.json'
const config: GrantConfig = json

const app = new koa()
app
  .use(session(app))
  .use(async (ctx, next) => {
    await next()
    const response: GrantResponse = ctx.state.grant.response
    ctx.body = JSON.stringify(response, null, 2)
  })
  .use(grant.koa(config))
  .listen(3000)
