
import express from 'express'
import expressSession from 'express-session'

import koa from 'koa'
import koaSession from 'koa-session'

import hapi from 'hapi'
import hapiSession from 'yar'

import fastify from 'fastify'
import fastifySession from 'fastify-session'

import {Application as curveball} from '@curveball/core'
import curveballSession from '@curveball/session'

// ----------------------------------------------------------------------------

import grant, {
  GrantConfig,
  GrantProvider,
  GrantSession,
  GrantResponse,
} from 'grant'
import json from '../config.json'
const config: GrantConfig = json

// ----------------------------------------------------------------------------

import {ExpressRequest, ExpressResponse} from '../types/express'
import {KoaContext} from '../types/koa'
import {HapiRequest} from '../types/hapi'
import {FastifyRequest, FastifyResponse} from '../types/fastify'

// ----------------------------------------------------------------------------

// Express
;(() => {
  var handler = grant.express(config)
  var app = express()
    .use(expressSession({secret: 'grant', saveUninitialized: true, resave: false}))
    .use(handler)
    .get('/hello', (req: ExpressRequest, res: ExpressResponse) => {
      // dynamic state overrides
      res.locals.grant = {dynamic: {subdomain: 'usershop'}}
      // session data
      var session = req.session.grant
      // transport querystring
      var a: GrantResponse = req.query
      // transport session
      var b = session.response
      // transport state
      var c = res.locals.grant.response
    })
})()

// ----------------------------------------------------------------------------

// Koa
;(() => {
  var handler = grant.koa(config)
  var app = new koa()
  app
    .use(koaSession(app))
    .use(handler)
    .use(async (ctx: KoaContext) => {
      // dynamic state overrides
      ctx.state.grant = {dynamic: {subdomain: 'usershop'}}
      // session data
      var session = ctx.session.grant
      // transport querystring
      var a: GrantResponse = ctx.query
      // transport session
      var b = session.response
      // transport state
      var c = ctx.state.grant.response
    })
})()

// ----------------------------------------------------------------------------

// Hapi
;(() => {
  var handler = grant.hapi(config)
  var app = new hapi.Server()
  app.register([
    {plugin: hapiSession, options: {cookieOptions: {password: 'grant', isSecure: false}}},
    {plugin: handler}
  ])

  app.ext('onPreHandler', (req: HapiRequest, res) => {
    // dynamic state overrides
    req.plugins.grant = {dynamic: {subdomain: 'usershop'}}
    return res.continue
  })

  app.ext('onPostHandler', (req: HapiRequest, res) => {
    // state transport
    var c = req.plugins.grant.response
    return res.continue
  })

  app.route({method: 'GET', path: '/hello', handler: (req, res) => {
    // session data
    var session: GrantSession = req.yar.get('grant')
    // transport querystring
    var a: GrantResponse = req.query // have to be qs.parse()
    // transport session
    var b = session.response
  }})
})()

// ----------------------------------------------------------------------------

// Fastify
;(() => {
  var handler = grant.fastify(config)
  var app = fastify()
    .decorateRequest('grant', {})
    .addHook('preHandler', async (req: FastifyRequest, res) => {
      // dynamic state overrides
      req.grant = {dynamic: {subdomain: 'usershop'}}
    })
    .decorateReply('grant', {})
    .addHook('onSend', async (req, res: FastifyResponse, payload) => {
      // state transport
      var c = res.grant.response
    })
    .register(fastifySession, {secret: 'grant', cookie: {secure: false}})
    .register(handler)
    .route({method: 'GET', url: '/hello', handler: async (req, res) => {
      // session data
      var session: GrantSession = req.session.grant
      // transport querystring
      var a: GrantResponse = req.query
      // transport session
      var b = session.response
    }})
})()

// ----------------------------------------------------------------------------

// Curveball
;(() => {
  var handler = grant.curveball(config)
  var app = new curveball()
  app.use(curveballSession({store: 'memory'}))
  app.use(handler)
  app.use(async (ctx, next) => {
    // dynamic state overrides
    var provider: GrantProvider = {subdomain: 'usershop'}
    ctx.state.grant = {dynamic: provider}
    // session data
    var session: GrantSession = ctx.state.session.grant
    // transport querystring
    var a: GrantResponse = ctx.request.query
    // transport session
    var b: GrantResponse = session.response
    // state transport
    var c: GrantResponse = ctx.state.grant.response
  })
})()

// ----------------------------------------------------------------------------
