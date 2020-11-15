
import express from 'express'
import session from 'express-session'
import {ExpressRequest} from '../types/express'
import grant, {GrantConfig} from 'grant'
import json from '../config.json'
const config: GrantConfig = json

express()
  .use(session({secret: 'grant', saveUninitialized: true, resave: false}))
  .use(grant.express(config))
  .get('/hello', (req: ExpressRequest, res) => {
    const session = req.session.grant
    const response = session.response
    res.end(JSON.stringify(response, null, 2))
  })
  .listen(3000)
