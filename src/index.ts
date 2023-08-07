import {grumftApi} from './grumft-api'

window.grumftApi = grumftApi

declare global {
  interface Window {
    grumftApi: typeof grumftApi
  }
}

export default grumftApi
