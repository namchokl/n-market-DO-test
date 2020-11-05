import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Market from '../components/Market'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listMyMarkets } from '../actions/marketActions'

const MyMarketsScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const myMarketList = useSelector((state) => state.myMarketList)
  const { loading, error, markets, page, pages } = myMarketList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listMyMarkets('', pageNumber))
  }, [dispatch, pageNumber])

  return (
    <>
      <h1>
        My Markets
        <LinkContainer to={'/markets/create'}>
          <Button
            variant='outline-primary'
            className='btn-sm float-right new-market'
          >
            <i className='fas fa-plus-square'></i> Market
          </Button>
        </LinkContainer>
      </h1>
      <Row>
        {markets.map((market) => (
          <Col key={market._id} sm={12} md={6} lg={4} xl={3}>
            <Market market={market} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MyMarketsScreen
