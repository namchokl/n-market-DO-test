import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMySelling } from '../actions/orderActions'

const MySellingScreen = ({ location, history }) => {
  const dateLocale = 'th' // 'en-gb'

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderMySelling = useSelector((state) => state.orderMySelling)
  const { loading: loadingOrders, error: errorOrders, orders } = orderMySelling

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listMySelling())
    }
  }, [dispatch, history, userInfo])

  return (
    <Row>
      <Col md={3}>
        <h2>สรุปการขาย</h2>
        <h4>ข้อมูล 7 วันล่าสุด</h4>
        <Table striped bordered hover responsive className='table-sm h-nowrap'>
          <thead>
            <tr>
              <th>อัพเดทเมื่อ</th>
              <td>11/11 12:12 น.</td>
            </tr>

            <tr>
              <th>การสั่งชื้อ</th>
              <td></td>
            </tr>
            <tr>
              <th>การสั่งชื้อ</th>
              <td></td>
            </tr>
            <tr>
              <th>จำนวนสินค้า</th>
              <td></td>
            </tr>
            <tr>
              <th>มูลค่ารวม</th>
              <td></td>
            </tr>
            <tr>
              <th>จำนวนลูกค้า</th>
              <td></td>
            </tr>
            <tr>
              <th>ยกเลิก</th>
              <td></td>
            </tr>
            <tr>
              <th>รีวิวใหม่</th>
              <td></td>
            </tr>
          </thead>
        </Table>
      </Col>
      <Col md={9}>
        <h2>รายการขายของฉัน</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm h-nowrap'
          >
            <thead>
              <tr>
                <th>วันที่</th>
                <th>ตลาด</th>
                <th>ลูกค้า</th>
                <th>สินค้า</th>
                <th>จำนวน</th>
                <th>ยอดรวม</th>
                <th>ชำระเงิน</th>
                <th>จัดส่ง</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* <td className='nowrap'>{order.createdAt.substring(0, 10)}</td> */}
                  <td className='nowrap'>
                    {new Date(order.createdAt).toLocaleDateString(dateLocale)}
                  </td>
                  <td>{order.marketName}</td>
                  <td className='nowrap'>{order.buyer.name}</td>
                  <td>{order.product.name}</td>
                  <td>{order.product.qty}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      new Date(order.paidAt).toLocaleDateString(dateLocale)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      new Date(order.deliveredAt).toLocaleDateString(dateLocale)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default MySellingScreen
