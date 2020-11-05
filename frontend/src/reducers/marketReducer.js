import {
  MARKET_LIST_REQUEST,
  MARKET_LIST_SUCCESS,
  MARKET_LIST_FAIL,
  MY_MARKETS_LIST_REQUEST,
  MY_MARKETS_LIST_SUCCESS,
  MY_MARKETS_LIST_FAIL,
  MARKET_DETAILS_REQUEST,
  MARKET_DETAILS_SUCCESS,
  MARKET_DETAILS_FAIL,
  MARKET_DETAILS_RESET,
  MARKET_CREATE_REQUEST,
  MARKET_CREATE_SUCCESS,
  MARKET_CREATE_FAIL,
  MARKET_CREATE_RESET,
  MARKET_UPDATE_REQUEST,
  MARKET_UPDATE_SUCCESS,
  MARKET_UPDATE_FAIL,
  MARKET_UPDATE_RESET,
  MARKET_JOIN_SUCCESS,
  MARKET_JOIN_FAIL,
} from '../constants/marketConstants'

export const marketListReducer = (state = { markets: [] }, action) => {
  switch (action.type) {
    case MARKET_LIST_REQUEST:
      return { loading: true, markets: [] }
    case MARKET_LIST_SUCCESS:
      return {
        loading: false,
        markets: action.payload.markets,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case MARKET_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const myMarketListReducer = (state = { markets: [] }, action) => {
  switch (action.type) {
    case MY_MARKETS_LIST_REQUEST:
      return { loading: true, markets: [] }
    case MY_MARKETS_LIST_SUCCESS:
      return {
        loading: false,
        markets: action.payload.markets,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case MY_MARKETS_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const marketDetailsReducer = (state = { market: {} }, action) => {
  switch (action.type) {
    case MARKET_DETAILS_REQUEST:
      return { loading: true, ...state }
    case MARKET_DETAILS_SUCCESS:
      return { loading: false, success: true, market: action.payload }
    case MARKET_JOIN_SUCCESS:
      return { loading: false, joinSuccess: true, market: action.payload }
    case MARKET_DETAILS_FAIL:
      return { ...state, loading: false, joinError: action.payload }
    case MARKET_JOIN_FAIL:
      return { loading: false, joinError: action.payload }
    case MARKET_DETAILS_RESET:
      return { market: {} }
    default:
      return state
  }
}

export const marketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKET_CREATE_REQUEST:
      return { loading: true }
    case MARKET_CREATE_SUCCESS:
      return { loading: false, success: true, newMarket: action.payload }
    case MARKET_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case MARKET_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const marketUpdateReducer = (state = { market: {} }, action) => {
  switch (action.type) {
    case MARKET_UPDATE_REQUEST:
      return { loading: true }
    case MARKET_UPDATE_SUCCESS:
      return { loading: false, success: true, market: action.payload }
    case MARKET_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case MARKET_UPDATE_RESET:
      return { market: {} }
    default:
      return state
  }
}
