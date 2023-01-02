import { IOClients } from '@vtex/api'

import FortuneCookiesClient from './FortuneCookies'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {

  public get FortuneCookies() {
    return this.getOrSet('fortuneCookies', FortuneCookiesClient)
  }
  
}
