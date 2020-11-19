
import express from 'express'
import session from 'express-session'

import grant, {GrantConfig, GrantResponse} from 'grant'

import json from '../config.json'
const config: GrantConfig = json

express()
  .use(session({secret: 'grant', saveUninitialized: true, resave: false}))
  .use(grant.express(config))
  .get('/hello', (req, res) => {
    const response: GrantResponse = req.query
    res.end(JSON.stringify(response, null, 2))
  })
  .listen(3000)
