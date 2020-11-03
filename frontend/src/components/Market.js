import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Market = ({ market }) => {
  return (
    <Card className='my-3 p-1 rounded'>
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

      <Card.Body>
        <Link to={`/market/${market._id}`}>
          <Card.Title as='div'>
            <strong>{market.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='h5' className='text-right'>
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
