
import express, {Request} from 'express'
import session, {Session} from 'express-session'

import grant, {GrantConfig, GrantSession} from 'grant'

import json from '../config.json'
const config: GrantConfig = json

interface ExpressSession extends Session {grant: GrantSession}
interface ExpressRequest extends Request {session: ExpressSession}

express()
  .use(session({secret: 'grant', saveUninitialized: true, resave: false}))
  .use(grant.express(config))
  .get('/hello', (req, res) => {
    const request = req as ExpressRequest
    const session = request.session.grant
    const response = session.response
    res.end(JSON.stringify(response, null, 2))
  })
  .listen(3000)
