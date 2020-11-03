import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import MarketBanner from '../components/MarketBanner'
import {
  createMarket,
  getMarketDetails,
  updateMarket,
} from '../actions/marketActions'
import { MARKET_CREATE_RESET } from '../constants/marketConstants'

const MarketEditScreen = ({ match, history, create }) => {
  let marketId = null
  if (!create) {
    marketId = match.params.id
  }

  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [district, setDistrict] = useState('')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [image, setImage] = useState('')
  const [policy, setPolicy] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const marketCreate = useSelector((state) => state.marketCreate)
  const { loading, error, success, newMarket } = marketCreate

  const marketDetails = useSelector((state) => state.marketDetails)
  const {
    loading: loadingMarketDetails,
    success: successMarketDetails,
    error: errorMarketDetails,
    market: editingMarket,
  } = marketDetails

  const marketUpdate = useSelector((state) => state.marketUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = marketUpdate

  useEffect(() => {
    if (!create) {
      if (editingMarket._id) {
        setName(editingMarket.name)
        setImage(editingMarket.image)
        setPolicy(editingMarket.policy)
        setAddress(editingMarket.Address.address)
        setDistrict(editingMarket.Address.district)
        setProvince(editingMarket.Address.province)
        setPostalCode(editingMarket.Address.postalCode)
        setCountry(editingMarket.Address.country)
      } else {
        dispatch(getMarketDetails(marketId))
      }
    }

    if (success) {
      history.push(`/market/${newMarket._id}`)
    }

    if (successUpdate) {
      history.push(`/market/${marketId}`)
    }
  }, [dispatch, create, success, successMarketDetails])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)

      // data returns as path.
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (create) {
      // create new market
      dispatch(
        createMarket({
          name,
          Address: {
            address,
            district,
            province,
            postalCode,
            country,
          },
          image,
          policy,
        })
      )
    } else {
      // update existing market
      dispatch(
        updateMarket({
          _id: marketId,
          name,
          Address: {
            address,
            district,
            province,
            postalCode,
            country,
          },
          image,
          policy,
        })
      )
    }
  }

  return (
    <>
      <Link
        to={marketId ? `/market/${marketId}` : '/markets'}
        className='btn btn-light my-3'
      >
        Go Back
      </Link>
      <MarketBanner name={name} image={image} id={null} />
      <FormContainer>
        {create ? <h1>สร้างตลาดขึ้นใหม่</h1> : <h1>แก้ไขข้อมูลตลาด</h1>}
        {loadingUpdate && <Loader />}
        {successUpdate && (
          <Message variant='success'>Market is updated</Message>
        )}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>ชื่อตลาด</Form.Label>
            <Form.Control
              type='text'
              placeholder='ตั้งชื่อตลาด'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='address'>
            <Form.Label>ชื่อสถานที่</Form.Label>
            <Form.Control
              type='text'
              placeholder='ระบุ สถานที่'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='district'>
            <Form.Label>เขต/อำเภอ</Form.Label>
            <Form.Control
              type='text'
              placeholder='ระบุ เขต/อำเภอ'
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='province'>
            <Form.Label>จังหวัด</Form.Label>
            <Form.Control
              type='text'
              placeholder='ระบุ จังหวัด'
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label>รหัสไปรษณีย์</Form.Label>
            <Form.Control
              type='number'
              placeholder='ระบุ รหัสไปรษณีย์'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country'>
            <Form.Label>ประเทศ</Form.Label>
            <Form.Control
              type='text'
              placeholder='ประเทศไทย'
              readOnly
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId='policy'>
            <Form.Label>กฎระเบียบ ของสมาชิกในกลุ่ม</Form.Label>
            <Form.Control
              as='textarea'
              row='3'
              placeholder='ใส่ กฎระเบียบ'
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            บันทึก
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default MarketEditScreen
