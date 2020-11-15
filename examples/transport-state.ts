
import express from 'express'
import session from 'express-session'
import {ExpressResponse} from '../types/express'
import grant, {GrantConfig} from 'grant'
import json from '../config.json'
const config: GrantConfig = json

express()
  .use(session({secret: 'grant', saveUninitialized: true, resave: false}))
  .use('/connect/:provider/:override?', express()
    .use(grant.express(config))
    .use((req, res: ExpressResponse) => {
      const response = res.locals.grant.response
      res.end(JSON.stringify(response, null, 2))
    })
  )
  .listen(3000)
