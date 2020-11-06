import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ marketId, product }) => {
  return (
    <Card className='my-2 p-2 rounded card-shadow card-item'>
      <Link to={`/market/${marketId}/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' className='card-img' />
      </Link>

      <Card.Body className='pt-2 pb-0 px-0'>
        <div className='d-flex justify-content-between'>
          <Link to={`/market/${marketId}/product/${product._id}`}>
            <Card.Title as='div' className='mb-1'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='h5' className='text-right ml-2'>
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

      <div className='pos-cardend'>
        <div className='d-flex justify-content-between mt-3'>
          <Card.Text as='h5' style={{ color: 'gray' }}>
            {product.countInStock < 1 && 'สินค้าหมด'}
          </Card.Text>
          <Card.Text as='p' className='text-right ml-2 mb-0'>
            {product.sellerName}
          </Card.Text>
        </div>
      </div>
    </Card>
  )
}

export default Product
