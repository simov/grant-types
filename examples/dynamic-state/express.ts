
import express, {Request} from 'express'
import session, {Session} from 'express-session'

import grant, {GrantConfig, GrantSession, GrantProvider} from 'grant'

import json from './config.json'
const config: GrantConfig = json

interface ExpressSession extends Session {grant: GrantSession}
interface ExpressRequest extends Request {session: ExpressSession}

express()
  .use(session({secret: 'grant', saveUninitialized: true, resave: false}))
  .use('/connect/google', (req, res, next) => {
    const provider: GrantProvider = {scope: ['openid']}
    res.locals.grant = {dynamic: provider}
    next()
  })
  .use(grant.express(config))
  .get('/hello', (req, res) => {
    const request = req as ExpressRequest
    const session = request.session.grant
    const response = session.response
    res.end(JSON.stringify(response, null, 2))
  })
  .listen(3000)
