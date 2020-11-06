import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import BackButton from '../components/BackButton'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { createOrder } from '../actions/orderActions'
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_UPDATE_RESET,
} from '../constants/productConstants'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [formOrder, setFormOrder] = useState(false)
  const [shipAddr, setShipAddr] = useState('')
  const [note, setNote] = useState('')

  const dispatch = useDispatch()

  const marketDetails = useSelector((state) => state.marketDetails)
  const { market } = marketDetails

  const productDetail = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetail

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderCreate = useSelector((state) => state.orderCreate)
  const {
    loading: orderLoading,
    success: orderSuccess,
    error: orderError,
    order,
  } = orderCreate

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    if (orderSuccess) {
      setFormOrder(false)
    }

    dispatch({ type: ORDER_CREATE_RESET })
    dispatch(listProductDetails(match.params.pid))
  }, [dispatch, match, successProductReview, orderSuccess])

  const prepareToOrderHandler = () => {
    // history.push(`/makeorder/${match.params.pid}?qty=${qty}`)
    setFormOrder(!formOrder)
    if (orderError) {
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.pid, {
        rating,
        comment,
      })
    )
  }

  const submitOrderHandler = (e) => {
    e.preventDefault()
    const newOrder = {
      productId: match.params.pid,
      market: match.params.mid,
      marketName: market.name,
      unitPrice: product.price,
      qty,
      shipAddr,
      note,
    }

    // DEBUG:
    if (match.params.mid !== market._id) {
      window.alert('Submit Order Error - market ID not correct.')
    }

    dispatch(createOrder(newOrder))
  }

  return (
    <>
      <Link
        className='btn btn-light btn-go-back'
        to={`/market/${match.params.mid}`}
      >
        {/* <BackButton path={`/market/${match.params.mid}`} /> */}
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={4} className='product-section'>
              <Image
                src={product.image}
                alt={product.name}
                className='card-shadow'
                fluid
              />
            </Col>
            <Col md={8}>
              <Row>
                <Col md={6} lg={8} className='product-section'>
                  <ListGroup variant='flush'>
                    <ListGroup.Item className='pt-0'>
                      <h3 className='pt-0'>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>ราคาต่อหน่วย</Col>
                        <Col>{product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>ค่าขนส่ง</Col>
                        <Col>{product.shipPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>รายละเอียด</Col>
                        <Col xs={12}>{product.description}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6} lg={4} className='product-section'>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>ผู้ขาย</Col>
                          <Col>
                            <strong>{product.sellerName}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>สถานะ</Col>
                          <Col>
                            {product.countInStock > 0
                              ? 'In Stock'
                              : 'Out Of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>จำนวน</Col>
                            <Col>
                              <Form.Control
                                as='select'
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[
                                  ...Array(
                                    Math.min(10, product.countInStock)
                                  ).keys(),
                                ].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item>
                        <Row>
                          <Col>ราคา</Col>
                          <Col>
                            <strong>{product.price * qty}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button
                          onClick={prepareToOrderHandler}
                          className='btn-block'
                          type='button'
                          disabled={product.countInStock === 0}
                          variant={formOrder ? 'secondary' : 'primary'}
                        >
                          {formOrder ? 'ยกเลิก' : 'สั่งชื้อสินค้า'}
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>

                {orderLoading && <Loader />}
                {orderError && (
                  <Message variant='danger'>
                    เกิดข้อผิดพลาด: {orderError}
                  </Message>
                )}
                {orderSuccess && (
                  <Message variant='success'>
                    การสั่งซื้อสำเร็จ กรุณารอการยืนยันจากผู้ขาย -
                    เลขที่คำสั่งชื้อ: {order._id}
                  </Message>
                )}
                {formOrder && (
                  <Col md={12}>
                    <div className='order-form'>
                      <h3>แบบฟอร์มยืนยันการสั่งสินค้า</h3>
                      <Form onSubmit={submitOrderHandler}>
                        <Form.Group controlId='shipAddr'>
                          <Form.Label>สถานที่จัดส่ง</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={shipAddr}
                            onChange={(e) => setShipAddr(e.target.value)}
                            placeholder='ที่อยู่ในการจัดส่ง'
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='note'>
                          <Form.Label>บันทึก</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder='บันทึกเพิ่มเติม อาทิ คำร้องขอพิเศษ'
                          ></Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                          ยืนยันคำสั่งชื้อ
                        </Button>
                      </Form>
                    </div>
                  </Col>
                )}
              </Row>

              {/* Review Section */}
              <Row>
                <Col className='product-section'>
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 && (
                    <Message>No Reviews</Message>
                  )}
                  <ListGroup variant='flush'>
                    {product.reviews.map((review) => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h2>Write a Customer Review</h2>
                      {errorProductReview && (
                        <Message variant='danger'>{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value=''>Select...</option>
                              <option value='1'>1 - Poor</option>
                              <option value='2'>2 - Fair</option>
                              <option value='3'>3 - Good</option>
                              <option value='4'>4 - Very Good</option>
                              <option value='5'>5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as='textarea'
                              row='3'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button type='submit' variant='primary'>
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to='/login'>sign in</Link> to write a
                          review{' '}
                        </Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
