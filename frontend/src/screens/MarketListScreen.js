import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Alert, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Market from '../components/Market'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listMarkets } from '../actions/marketActions'

const MarketListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const [showAlert, setShowAlert] = useState(false)
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
    // setShowAlert(false)
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

  const newMarketHandler = (e) => {
    if (!userInfo) {
      e.preventDefault()
      setShowAlert(true)
    }
  }
  return (
    <>
      <h1>
        Market List
        <LinkContainer to={'/markets/create'}>
          <Button
            variant='outline-primary'
            className='btn-sm float-right new-market'
            onClick={newMarketHandler}
          >
            <i className='fas fa-plus-square'></i> Market
          </Button>
        </LinkContainer>
      </h1>

      {showAlert && (
        <Alert variant='danger' onClose={() => setShowAlert(false)} dismissible>
          <p>
            กรุณา{' '}
            <Link to='/login' className='link-text'>
              เข้าสู่ระบบ
            </Link>{' '}
            เพื่อสร้างตลาดขึ้นใหม่ !
          </p>
        </Alert>
      )}

      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
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
