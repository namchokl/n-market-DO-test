import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import BackButton from '../components/BackButton'
import {
  getOrderDetails,
  // payOrder,
  // deliverOrder,
  updateOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_UPDATE_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const priceUnit = 'บาท'
  const unit = 'หน่วย'

  const orderId = match.params.id

  const [nextStatus, setNextStatus] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderUpdate = useSelector((state) => state.orderUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    updatedOrder,
    error: errorUpdate,
  } = orderUpdate

  const updateNextStatus = (status) => {
    switch (status) {
      case 'open':
        setNextStatus('confirmed')
        break
      case 'confirmed':
        setNextStatus('delivered')
        break
      case 'delivered':
        setNextStatus('paid')
        break
      case 'paid':
        setNextStatus('closed')
        break
      default:
        setNextStatus('')
        break
    }
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (!order || order._id !== orderId || successUpdate) {
      // Reset 'successPay' to prevent keeps updating in this loop

      dispatch(getOrderDetails(orderId))
      if (successUpdate) {
        dispatch({ type: ORDER_UPDATE_RESET })
        updateNextStatus(updatedOrder.status)
      }
    } else {
      updateNextStatus(order.status)
    }
  }, [dispatch, order, orderId, successUpdate])

  const updateHandler = () => {
    if (nextStatus) {
      dispatch(
        updateOrder(orderId, {
          field: 'status',
          cmd: nextStatus,
        })
      )
    }
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <BackButton
        path={order.seller._id === userInfo._id ? '/myselling' : '/mybuying'}
      />
      {/* <Link to='/myselling' className='btn btn-light my-3 float-right'>
        Go Back
      </Link> */}
      <h1 className='d-inline-block mr-2'>Order: </h1>
      <h5 className='d-inline-block'>{order._id}</h5>

      <Row className='mt-3'>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>สถานะ: {order.status}</h4>
              <p>
                <strong>ผู้ขาย: </strong>
                {order.seller.name}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>ผู้ซื้อ: </strong>
                {order.buyer.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.buyer.email}`}>{order.buyer.email}</a>
              </p>

              <p>
                <strong>ที่อยู่จัดส่ง: </strong>
                {order.shipAddr},
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Pain on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              <Row>
                <Col md={2}>
                  <Image
                    src={order.product.image}
                    alt={order.product.name}
                    fluid
                    rounded
                  />
                </Col>
                <Col>
                  <Link
                    to={`/market/${order.market}/product/${order.product.id}`}
                  >
                    {order.product.name}
                  </Link>
                </Col>
                <Col md={4}>
                  {order.product.qty} {unit} x {order.product.unitPrice}{' '}
                  {priceUnit} = {order.product.price} {priceUnit}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    {order.product.price} {priceUnit}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    {order.shipPrice ? order.shipPrice : '0'} {priceUnit}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>
                    {order.totalPrice} {priceUnit}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Created</Col>
                  <Col>{order.createdAt.substring(0, 10)}</Col>
                </Row>
              </ListGroup.Item>
              {nextStatus && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    onClick={updateHandler}
                  >
                    {nextStatus}
                  </Button>
                </ListGroup.Item>
              )}

              {/* {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )} */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
