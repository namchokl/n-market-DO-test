import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Market from '../components/Market'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listMarkets } from '../actions/marketActions'

const MarketListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const marketList = useSelector((state) => state.marketList)
  const { loading, error, markets, page, pages } = marketList

  // const productCreate = useSelector((state) => state.productCreate)
  // const {
  //   loading: loadingCreate,
  //   error: errorCreate,
  //   success: successCreate,
  //   product: createdProduct,
  // } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listMarkets('', pageNumber))
  }, [dispatch, pageNumber])

  // const deleteHandler = (id) => {
  //   if (window.confirm('Are you sure')) {
  //     dispatch(deleteProduct(id))
  //   }
  // }

  // const createProductHandler = () => {
  //   dispatch(createProduct())
  // }

  return (
    <>
      <h1>
        Market List
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
            <Market market={market} randColor={true} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default MarketListScreen
