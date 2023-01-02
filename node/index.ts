import type { ServiceContext, RecorderState,ParamsContext } from '@vtex/api'
import { LRUCache, Service } from '@vtex/api'

import { Clients } from './clients'
// import {getAllFortuneCookie} from './middlewares/getAllFortuneCookie'
// import {getRandomFortuneCookie} from './middlewares/getRandomFortuneCookie'
// import {createFortuneCookie} from './middlewares/createFortuneCookie'
// import {deleteFortuneCookie} from './middlewares/deleteFortuneCookie'
import { getAllFortuneCookie,getRandomFortuneCookie,createFortuneCookie,deleteFortuneCookie,editFortuneCookie,searchCookie } from './resolvers/index'


// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)


declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    code: number
  }
}

// Export a service that defines route handlers and client options.
export default new Service<Clients, State, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: 10000,
      },
    },
  },
  graphql: {
    resolvers: {
      Query: {
        getAllFortuneCookie,
        getRandomFortuneCookie,
        searchCookie
      },
      Mutation: {
        createFortuneCookie,
        deleteFortuneCookie,
        editFortuneCookie
      },
    },
  },
});