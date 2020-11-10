import axios from 'axios'
import {
  MARKET_LIST_REQUEST,
  MARKET_LIST_SUCCESS,
  MARKET_LIST_FAIL,
  MY_MARKETS_LIST_REQUEST,
  MY_MARKETS_LIST_SUCCESS,
  MY_MARKETS_LIST_FAIL,
  MY_MARKETS_LIST_RESET,
  MARKET_DETAILS_REQUEST,
  MARKET_DETAILS_SUCCESS,
  MARKET_DETAILS_FAIL,
  MARKET_JOIN_SUCCESS,
  MARKET_JOIN_FAIL,
  MARKET_CREATE_REQUEST,
  MARKET_CREATE_SUCCESS,
  MARKET_CREATE_FAIL,
  MARKET_UPDATE_REQUEST,
  MARKET_UPDATE_SUCCESS,
  MARKET_UPDATE_FAIL,
} from '../constants/marketConstants'

import { USER_LOGIN_UPDATE_MARKET } from '../constants/userConstants'

export const listMarkets = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: MARKET_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/markets?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: MARKET_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MARKET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listMyMarkets = (keyword = '', pageNumber = '') => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: MY_MARKETS_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `/api/markets/my?keyword=${keyword}&pageNumber=${pageNumber}`,
      // {},
      config
    )

    dispatch({
      type: MY_MARKETS_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MY_MARKETS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const getMarketDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MARKET_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/markets/${id}`)

    dispatch({
      type: MARKET_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MARKET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createMarket = (market) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARKET_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    market.creator = userInfo._id

    const { data } = await axios.post(`/api/markets`, market, config)

    dispatch({
      type: MARKET_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MARKET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateMarket = (market) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARKET_UPDATE_REQUEST,
    })

    // 2-level Destructure to get 'state.userLogin.userInfo' object
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/markets/${market._id}`,
      market,
      config
    )

    dispatch({
      type: MARKET_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: MARKET_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const joinMarket = (id) => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: MARKET_DETAILS_REQUEST,
    // })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/markets/${id}/join`, {}, config)

    dispatch({
      type: MARKET_JOIN_SUCCESS,
      payload: data.market,
    })

    dispatch({
      type: USER_LOGIN_UPDATE_MARKET,
      payload: data.userInfo,
    })

    dispatch({ type: MY_MARKETS_LIST_RESET })

    // update localStorage for market list
    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
  } catch (error) {
    dispatch({
      type: MARKET_JOIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const leaveMarket = (id) => async (dispatch, getState) => {
  try {
    // dispatch({
    //   type: MARKET_DETAILS_REQUEST,
    // })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/markets/${id}/leave`, {}, config)

    dispatch({
      type: MARKET_JOIN_SUCCESS,
      payload: data.market,
    })

    dispatch({
      type: USER_LOGIN_UPDATE_MARKET,
      payload: data.userInfo,
    })

    dispatch({ type: MY_MARKETS_LIST_RESET })

    // update localStorage for market list
    localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
  } catch (error) {
    dispatch({
      type: MARKET_JOIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
