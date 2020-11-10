import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Badge, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Market from '../components/Market'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listMyMarkets } from '../actions/marketActions'
import { Link } from 'react-router-dom'

const MyMarketsScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1

  const [noMarkets, setNoMarkets] = useState(false)
  const dispatch = useDispatch()

  const myMarketList = useSelector((state) => state.myMarketList)
  const { loading, success, error, markets, page, pages } = myMarketList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!userInfo) {
    history.push('/login')
  }

  useEffect(() => {
    if (success) {
      if (markets.length < 1) {
        setNoMarkets(true)
      } else {
        setNoMarkets(false)
      }
    } else {
      setNoMarkets(false)
      dispatch(listMyMarkets('', pageNumber))
    }
  }, [dispatch, pageNumber, success])

  return (
    <>
      <h1>My Markets</h1>
      {noMarkets && (
        <div className='text-center'>
          <p className='my-5'> - คุณยังไม่ได้เข้าเป็นสมาชิกตลาดใดๆ - </p>
          <div>
            <div className='mb-3'>
              <LinkContainer to='/markets'>
                <Button variant='outline-info' className='btn textBtn'>
                  ค้นหาตลาด
                </Button>
              </LinkContainer>{' '}
              <span>ในชุมชมของคุณ</span>
            </div>

            <div className='mb-5 px-3'>
              <span>
                หรือ <span className='bold-text'>สร้างตลาด</span>{' '}
                ขึ้นมาใหม่ถ้ายังไม่มีเพื่อชุมชนของคุณ
              </span>
            </div>
            <div className='mb-2 px-3'>
              <span className='bold-text'>
                แล้วอย่าลืมชวนเพื่อนบ้านเข้ามา ชื้อ-ขาย ด้วยกันเยอะ
                จะได้ไม่เหงา...
              </span>
            </div>
          </div>
        </div>
      )}

      <Row>
        {markets &&
          markets.map((market) => (
            <Col key={market._id} sm={12} md={6} lg={6} xl={4}>
              <Market market={market} />
            </Col>
          ))}
      </Row>
    </>
  )
}

export default MyMarketsScreen
