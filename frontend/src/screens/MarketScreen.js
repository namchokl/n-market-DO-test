import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, CardDeck } from 'react-bootstrap'

import Product from '../components/Product'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import MarketBanner from '../components/MarketBanner'
import SearchBox from '../components/SearchBox'
import Meta from '../components/Meta'

import { getMarketDetails } from '../actions/marketActions'
import { listProducts } from '../actions/productActions'

const MarketScreen = ({ history, match }) => {
  const marketId = match.params.id
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const marketDetails = useSelector((state) => state.marketDetails)
  const {
    loading: loadingMarketDetails,
    success: successMarketDetails,
    error: errorMarketDetails,
    market,
  } = marketDetails

  const productList = useSelector((state) => state.productList)
  const {
    loading: loadingList,
    error: errorList,
    products,
    page,
    pages,
  } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (market._id !== marketId) {
      dispatch({ type: 'MARKET_DETAILS_RESET' })
      dispatch(getMarketDetails(match.params.id))
    }

    dispatch(listProducts(match.params.id, '', pageNumber))
  }, [dispatch, match])

  return (
    <>
      <MarketBanner
        name={market.name}
        image={market.image}
        id={market._id}
        create={false}
        market={market}
      />
      {/* <MarketBanner market={market} /> */}
      <Row>
        <Col className='d-flex justify-content-between flex-wrap'>
          <h2 className='nowrap mr-3'>รายการสินค้า</h2>

          <Route render={({ history }) => <SearchBox history={history} />} />
        </Col>
      </Row>

      {loadingList ? (
        <Loader />
      ) : errorList ? (
        <Message variant='danger'>{errorList}</Message>
      ) : (
        <>
          <Row>
            <div className='card-container py-3'>
              {products.map((product) => (
                <Product
                  key={product._id}
                  marketId={market._id}
                  product={product}
                />
                // <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                //   <Product marketId={market._id} product={product} />
                // </Col>
              ))}
            </div>
          </Row>
          {products.length == 0 && (
            <h5 className='text-center mt-5'>- ยังไม่มีสินค้า -</h5>
          )}
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            market={marketId}
          />
        </>
      )}
    </>
  )
}

export default MarketScreen
