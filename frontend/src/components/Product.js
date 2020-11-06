import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ marketId, product }) => {
  return (
    <Card className='my-2 p-2 rounded card-item'>
      <Link to={`/market/${marketId}/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' className='card-img' />
      </Link>

      <Card.Body>
        <div className='cardbody-top'>
          <Link to={`/market/${marketId}/product/${product._id}`}>
            <Card.Title as='div' className='mb-1'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text
            as='h5'
            className={`text-right ml-2 ${
              product.countInStock < 1 && 'text-strike'
            }`}
          >
            {product.price} บาท
          </Card.Text>
        </div>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        {/* <div className='pos-cardend'>
          <div className='d-flex justify-content-between mt-3'>
            <Card.Text as='h5' style={{ color: 'gray' }}>
              {product.countInStock < 1 && 'สินค้าหมด'}
            </Card.Text>
            <Card.Text as='p' className='text-right ml-2 mb-0'>
              {product.sellerName}
            </Card.Text>
          </div>
        </div> */}
      </Card.Body>

      <div className='card-end'>
        <div className=''>
          {product.countInStock < 1 && (
            <Card.Text as='h6' className='prod-status'>
              สินค้าหมด
            </Card.Text>
          )}

          <Card.Text as='p' className='text-right ml-auto mb-0'>
            {product.sellerName}
          </Card.Text>
        </div>
      </div>
    </Card>
  )
}

export default Product
