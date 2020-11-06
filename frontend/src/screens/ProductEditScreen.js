import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_RESET,
} from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [shipPrice, setShipPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const [selMarkets, setSelMarkets] = useState([])

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      history.push('/myproducts')
    } else {
      if (!product || !product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        if (!userInfo) {
          history.push('/login')
        } else if (product.user !== userInfo._id) {
          history.push('/myproducts')
        }

        setName(product.name)
        setPrice(product.price)
        setShipPrice(product.shipPrice)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)

        if (product.markets) {
          setSelMarkets(product.markets)
        }
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

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
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
        markets: [...selMarkets],
      })
    )
  }

  const selectMarketHandler = (e) => {
    // e.preventDefault()
    let mktId = e.target.id

    console.log('click selectMarketHandler...')
    console.log(e.target.id)

    if (!selMarkets.includes(mktId)) {
      console.log('value = TRUE')

      if (!selMarkets.includes(mktId)) {
        setSelMarkets([...selMarkets, mktId])
      }
    } else {
      console.log('value = FALSE')

      if (selMarkets.includes(mktId)) {
        setSelMarkets(selMarkets.filter((item) => item !== mktId))
      }
    }
  }

  return (
    <>
      <Link to='/myproducts' className='btn btn-light  btn-go-back'>
        Go Back
      </Link>
      <h1>Edit Product</h1>
      <Row>
        <Col sm={12} md={4} lg={6}>
          <img src={image} fluid className='mb-3' style={{ width: '100%' }} />
        </Col>
        <Col sm={12} md={8} lg={6}>
          <div>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>ชื้อสินค้า</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='price'>
                  <Form.Label>ราคา</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='shipPrice'>
                  <Form.Label>ค่าจัดส่ง</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter shipping price'
                    value={shipPrice}
                    onChange={(e) => setShipPrice(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>รูปภาพ</Form.Label>
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

                <Form.Group controlId='brand'>
                  <Form.Label>แบรนด์ผู้ผลิต</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>หมวดหมู่</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                  <Form.Label>จำนวนในสต๊อก</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter countInStock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>รายละเอียดสินค้า</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postedMarkets'>
                  <Form.Label>ตลาดที่ลงขาย</Form.Label>
                  {userInfo.markets.map((mr) => (
                    <Form.Check
                      type='switch'
                      id={mr._id}
                      key={mr._id}
                      label={mr.name}
                      checked={selMarkets.includes(mr._id)}
                      onChange={selectMarketHandler}
                    />
                  ))}
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ProductEditScreen
