
import grant, {
  GrantConfig,
  GrantHandler,
  ExpressMiddleware,
  KoaMiddleware,
  HapiMiddleware,
  FastifyMiddleware,
  CurveballMiddleware,
} from 'grant'
import json from '../config.json'
var config: GrantConfig = json

// ----------------------------------------------------------------------------

// grant - any - eager
;(() => {
  var a: ExpressMiddleware = grant({handler: 'express', config})
  var b: GrantHandler = grant({handler: 'aws', config})
})()

// grant - any - lazy
;(() => {
  var a: ExpressMiddleware = grant()({handler: 'express', config})
  var b: GrantHandler = grant()({handler: 'aws', config})
})()

// grant config
;(() => {
  var a = grant.express({defaults: {}, google: {}})
  var b = grant.express()({defaults: {}, google: {}})
})()

// grant options
;(() => {
  var a = grant.express({config: {defaults: {}, google: {}}, request: {}})
  var b = grant.aws({config: {defaults: {}, google: {}}, session: {secret: ''}})
  var c = grant.express()({config: {defaults: {}, google: {}}, request: {}})
  var d = grant.aws()({config: {defaults: {}, google: {}}, session: {secret: ''}})
})()

// ----------------------------------------------------------------------------

// middleware - type - eager
;(() => {
  var a = grant.express(config)
  var b = grant.koa(config)
  var c = grant.hapi(config)
  var d = grant.fastify(config)
  var e = grant.curveball(config)
})()

// middleware - type - lazy
;(() => {
  var a = grant.express()(config)
  var b = grant.koa()(config)
  var c = grant.hapi()(config)
  var d = grant.fastify()(config)
  var e = grant.curveball()(config)
})()

// middleware - any - eager
;(() => {
  var a: ExpressMiddleware = grant({handler: 'express', config})
  var b: KoaMiddleware = grant({handler: 'koa', config})
  var c: HapiMiddleware = grant({handler: 'hapi', config})
  var d: FastifyMiddleware = grant({handler: 'fastify', config})
  var e: CurveballMiddleware = grant({handler: 'curveball', config})
})()

// middleware - any - lazy
;(() => {
  var a: ExpressMiddleware = grant()({handler: 'express', config})
  var b: KoaMiddleware = grant()({handler: 'koa', config})
  var c: HapiMiddleware = grant()({handler: 'hapi', config})
  var d: FastifyMiddleware = grant()({handler: 'fastify', config})
  var e: CurveballMiddleware = grant()({handler: 'curveball', config})
})()

// ----------------------------------------------------------------------------

// grant handler - type - eager
;(async () => {
  var a = grant.node({config})
  var b = grant.aws({config})
  var c = grant.azure({config})
  var d = grant.gcloud({config})
  var e = grant.vercel({config})
  var {session, redirect, response} = await a({})
  var {session, redirect, response} = await b({})
  var {session, redirect, response} = await c({})
  var {session, redirect, response} = await d({})
  var {session, redirect, response} = await e({})
})()

// grant handler - type - lazy
;(async () => {
  var a = grant.node()({config})
  var b = grant.aws()({config})
  var c = grant.azure()({config})
  var d = grant.gcloud()({config})
  var e = grant.vercel()({config})
  var {session, redirect, response} = await a({})
  var {session, redirect, response} = await b({})
  var {session, redirect, response} = await c({})
  var {session, redirect, response} = await d({})
  var {session, redirect, response} = await e({})
})()

// grant handler - any - eager
;(async () => {
  var a: GrantHandler = grant({handler: 'node', config})
  var b: GrantHandler = grant({handler: 'aws', config})
  var c: GrantHandler = grant({handler: 'azure', config})
  var d: GrantHandler = grant({handler: 'gcloud', config})
  var e: GrantHandler = grant({handler: 'node', config})
  var {session, redirect, response} = await a({})
  var {session, redirect, response} = await b({})
  var {session, redirect, response} = await c({})
  var {session, redirect, response} = await d({})
  var {session, redirect, response} = await e({})
})()

// grant handler - any - lazy
;(async () => {
  var a: GrantHandler = grant()({handler: 'node', config})
  var b: GrantHandler = grant()({handler: 'aws', config})
  var c: GrantHandler = grant()({handler: 'azure', config})
  var d: GrantHandler = grant()({handler: 'gcloud', config})
  var e: GrantHandler = grant()({handler: 'node', config})
  var {session, redirect, response} = await a({})
  var {session, redirect, response} = await b({})
  var {session, redirect, response} = await c({})
  var {session, redirect, response} = await d({})
  var {session, redirect, response} = await e({})
})()

// ----------------------------------------------------------------------------
