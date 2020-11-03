import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Jumbotron, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { joinMarket, leaveMarket } from '../actions/marketActions'

const MarketBanner = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const marketDetails = useSelector((state) => state.marketDetails)
  const { loading, joinSuccess, joinError, market } = marketDetails

  const joinMarketHandler = () => {
    dispatch(joinMarket(market._id))
  }

  const leaveMarketHandler = () => {
    dispatch(leaveMarket(market._id))
  }

  return (
    <Jumbotron
      fluid
      style={{
        backgroundColor: 'lightpink',
        backgroundImage: `url(${
          market.image ? market.image : '/images/sample-market.jpg'
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '160px',
        padding: 0,
        position: 'relative',
      }}
    >
      <h1
        style={{
          fontSize: '150%',
          display: 'inline-block',
          backgroundColor: 'rgba(255,255,255,0.65)',
          top: 0,
          // width: '85%',
          textAlign: 'center',
          padding: '0.5rem',
        }}
      >
        ตลาด: {market.name}
      </h1>
      <Card.Text as='h5' className='p-3'>
        <span title='สมาชิก'>
          <i className='fas fa-users'></i> {market.numPeople}
        </span>
        <span title='สินค้า'>
          <i className='fas fa-boxes ml-3'></i> {market.numProducts}
        </span>
      </Card.Text>

      {market._id && (
        <LinkContainer to={`/market/${market._id}/edit`}>
          <i className='fas fa-ellipsis-h details-icon'></i>
        </LinkContainer>
      )}

      {userInfo &&
        (userInfo.markets.includes(market._id) ? (
          <Button
            variant='info'
            size='lg'
            className='join-market'
            onClick={leaveMarketHandler}
          >
            เป็นสมาชิกแล้ว
          </Button>
        ) : (
          <Button
            variant='info'
            size='lg'
            className='join-market'
            onClick={joinMarketHandler}
          >
            <i className='fas fa-user-plus' />
            เข้าร่วม
          </Button>
        ))}
    </Jumbotron>
  )
}

export default MarketBanner
