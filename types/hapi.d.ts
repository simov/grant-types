
import {Request as _HapiRequest, PluginsStates as _PluginsStates} from 'hapi'
import {GrantProvider, GrantResponse} from 'grant'

/**
 * Hapi plugins
 */
interface PluginStates extends _PluginsStates {
  grant: {
    dynamic?: GrantProvider
    response?: GrantResponse
  }
}

/**
 * Hapi request
 */
export interface HapiRequest extends _HapiRequest {
  plugins: PluginStates
}
