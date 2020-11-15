
import grant from 'grant'

// error using GrantConfig in GrantOptions
var a = grant.node({
  handler: 'node', // determines GrantOptions
  config: {
    defaults: {},
    google: {},
  },
  session: {secret: ''},
  google: {},
})

// error using GrantOption inside GrantConfig
var b = grant.node({
  defaults: {}, // determines GrantConfig
  google: {},
  request: {},
})

// error using GrantOption inside GrantConfig
var c = grant.node({
  handler: 'node',
  config: {
    defaults: {},
    google: {},
    request: {},
  },
})
