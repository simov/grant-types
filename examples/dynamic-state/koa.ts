
import koa from 'koa'
import session from 'koa-session'

import grant, {GrantConfig, GrantSession, GrantProvider} from 'grant'

import json from './config.json'
const config: GrantConfig = json

const app = new koa()
app
  .use(session(app))
  .use(async (ctx, next) => {
    const provider: GrantProvider = {scope: ['openid']}
    ctx.state.grant = {dynamic: provider}
    await next()
  })
  .use(grant.koa(config))
  .use(async (ctx) => {
    const session: GrantSession = ctx.session.grant
    const response = session.response
    ctx.body = JSON.stringify(response, null, 2)
  })
  .listen(3000)
