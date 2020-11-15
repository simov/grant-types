
# grant-types

> _Types for **[Grant]** OAuth Proxy_

```ts
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
```

Pull this repository, install its dependencies, and load it into VSCode. Take a look at the `examples` and the `test` folder.

In addition to the [type definitions][type-definitions] provided in Grant you can find helper extend definitions inside the `types` folder in this repository. These definitions extend the request, response and session objects of your HTTP framework of choice. Note the `ExpressRequest` type in the above code snippet loaded from the `types` folder.

You can also specify all types explicitly:

```ts
import Koa from 'koa'
import session from 'koa-session'
import grant, {
  GrantConfig,
  GrantProvider,
  GrantSession,
  GrantResponse,
} from 'grant'
import json from '../config.json'
const config: GrantConfig = json

const app = new Koa()
app
  .use(session(app))
  .use(grant.koa(config))
  .use(async (ctx) => {
    // dynamic state overrides
    const provider: GrantProvider = {subdomain: 'usershop'}
    ctx.state.grant = {dynamic: provider}
    // session data
    const session: GrantSession = ctx.session.grant
    // transport querystring
    const a: GrantResponse = ctx.query
    // transport session
    const b = session.response
    // transport state
    const c: GrantResponse = ctx.state.grant.response
  })
  .listen(3000)
```

And the serverless handlers look like this:

```ts
import grant, {GrantConfig} from 'grant'
import json from '../config.json'
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
```


  [Grant]: https://github.com/simov/grant
  [type-definitions]: https://github.com/simov/grant/blob/master/grant.d.ts
