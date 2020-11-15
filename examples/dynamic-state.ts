
import express from 'express'
import session from 'express-session'
import {ExpressRequest, ExpressResponse} from '../types/express'
import grant, {GrantConfig} from 'grant'
import json from '../config.json'
const config: GrantConfig = json

express()
  .use(session({secret: 'grant', saveUninitialized: true, resave: false}))
  .use('/connect/google', (req, res: ExpressResponse, next) => {
    res.locals.grant = {dynamic: {scope: ['openid']}}
    next()
  })
  .use(grant.express(config))
  .get('/hello', (req: ExpressRequest, res) => {
    const response = req.session.grant.response
    res.end(JSON.stringify(response, null, 2))
  })
  .listen(3000)
