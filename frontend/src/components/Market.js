import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import randomColor from '../utils/randColor'

const Market = ({ market, randColor }) => {
  let color = randColor ? { boxShadow: `3px 3px 14px ${randomColor()}` } : {}

  return (
    <Card
      className={`my-3 p-2 rounded ${randColor || 'card-shadow'}`}
      style={color}
    >
      <Link to={`/market/${market._id}`}>
        <div
          style={{
            backgroundImage: `url(${market.image})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: '100%',
            height: '150px',
            overflow: 'hidden',
          }}
        >
          {/* <Card.Img
            src={market.image}
            variant='top'
            width='auto'
            height='100%'
          /> */}
        </div>
      </Link>

      <Card.Body className='pt-2 pb-0 px-0'>
        <Link to={`/market/${market._id}`}>
          <Card.Title as='h5'>
            <strong>{market.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h5' className='text-right market-icons'>
          <span title='สมาชิก'>
            <i className='fas fa-users'></i> {market.numPeople}
          </span>
          <span title='สินค้า'>
            <i className='fas fa-boxes ml-3'></i> {market.numProducts}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Market
