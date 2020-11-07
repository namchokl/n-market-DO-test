import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Jumbotron, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  joinMarket,
  leaveMarket,
  getMarketDetails,
} from '../actions/marketActions'

const MarketBanner = ({ name, image, id, create, market }) => {
  const dispatch = useDispatch()

  // const [marketImg, setMarketImg] = useState('')
  const [marketList, setMarketList] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const marketDetails = useSelector((state) => state.marketDetails)
  // const { loading, joinSuccess, joinError, market } = marketDetails

  const joinMarketHandler = () => {
    dispatch(joinMarket(market._id))
  }

  const leaveMarketHandler = () => {
    dispatch(leaveMarket(market._id))
  }

  useEffect(() => {
    if (userInfo && userInfo.markets) {
      setMarketList(userInfo.markets.map((item) => item._id))
    }
  }, [userInfo])
  // if (create) {
  //   setMarketImg(image)
  // } else {
  //   setMarketImg(market.image)
  // }

  // const theImage = create ? image : market.image
  // const theName = create ? name : market.name

  return (
    <Jumbotron
      fluid
      style={{
        backgroundColor: 'lightpink',
        backgroundImage: `url(${image ? image : '/images/sample-market.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '160px',
        marginBottom: '1rem',
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
        ตลาด: {name}
      </h1>
      {!create && market && (
        <Card.Text as='h5' className='p-3'>
          <span title='สมาชิก'>
            <i className='fas fa-users'></i> {market.numPeople}
          </span>
          <span title='สินค้า'>
            <i className='fas fa-boxes ml-3'></i> {market.numProducts}
          </span>
        </Card.Text>
      )}

      {market && market._id && (
        <LinkContainer to={`/market/${market._id}/edit`}>
          <i className='fas fa-ellipsis-h details-icon'></i>
        </LinkContainer>
      )}

      {marketList.includes(id) ? (
        <Button
          variant='info'
          size='sm'
          className='join-market-sm'
          onClick={leaveMarketHandler}
        >
          เป็นสมาชิกแล้ว
        </Button>
      ) : (
        <Button
          variant='warning'
          size='lg'
          className='join-market'
          onClick={joinMarketHandler}
        >
          <i className='fas fa-user-plus' />
          เข้าร่วม
        </Button>
      )}
    </Jumbotron>
  )
}

export default MarketBanner
