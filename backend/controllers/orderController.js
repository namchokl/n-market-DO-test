import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    productId,
    market,
    marketName,
    unitPrice,
    qty,
    shipAddr,
    note,
  } = req.body

  const product = await Product.findById(productId)

  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  if (product.user.toString() == req.user._id) {
    res.status(404)
    throw new Error('Cannot buy your own product')
  }

  if (product.price !== unitPrice) {
    res.status(404)
    throw new Error('Product price is changed')
  }

  if (!product.active) {
    res.status(404)
    throw new Error('Product currently inactive')
  }

  if (product.countInStock < qty) {
    res.status(404)
    throw new Error('Product in-stock less than order qty')
  }

  if (qty <= 0) {
    res.status(404)
    throw new Error('Order qty must greater than 0')
  }

  const itemPrice = qty * product.price
  const totalPrice = itemPrice + product.shipPrice

  // reduce product stock
  product.countInStock -= qty
  if (!product.sellerName) {
    product.sellerName = '-'
  }
  await product.save()

  const order = new Order({
    buyer: req.user._id,
    seller: product.user,
    market,
    marketName,
    product: {
      id: product._id,
      name: product.name,
      image: product.image,
      qty,
      unitPrice: product.price,
      price: itemPrice,
    },
    shipAddr,
    note,
    shipPrice: product.shipPrice,
    totalPrice: totalPrice,
  })

  const createOrder = await order.save()

  res.status(201).json(createOrder)
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // get 'name' and 'email' from 'user' data along with the order data.
  const order = await Order.findById(req.params.id)
    .populate('buyer', 'name email')
    .populate('seller', 'name')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Error not found')
  }
})

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  // --- Data in body ---
  // req.body = {
  //   field: 'status',
  //   cmd: 'cmd'
  // }

  if (order) {
    const { field, cmd } = req.body

    if (order.seller.toString() == req.user._id) {
      console.log('seller id Correct...')
      // update by seller
      const statusCmds = [
        'open',
        'confirmed',
        'delivered',
        'paid',
        'cancelled',
        'closed',
      ]

      if (field === 'status') {
        if (!statusCmds.includes(cmd)) {
          res.status(400)
          throw new Error('Invalid command')
        }

        order.status = cmd

        if (!order.isDelivered && order.status === 'delivered') {
          order.isDelivered = true
          order.deliveredAt = Date.now()
        }

        if (!order.isPaid && order.status === 'paid') {
          order.isPaid = true
          order.paidAt = Date.now()
        }
      }

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      console.log('seller id Incorrect...')
      res.status(401)
      throw new Error('Not authorized request')
    }
  } else {
    res.status(404)
    throw new Error('Error not found')
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Error not found')
  }
})

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Error not found')
  }
})

// @desc    Get logged in user buyer-order
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ buyer: req.user._id })
    .populate('buyer', '_id name')
    .populate('seller', '_id name')

  res.json(orders)
})

// @desc    Get logged in user sell-order
// @route   GET /api/orders/myselling
// @access  Private
const getMySelling = asyncHandler(async (req, res) => {
  const orders = await Order.find({ seller: req.user._id })
    .populate('buyer', '_id name')
    .populate('seller', '_id name')

  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // get id & name of the 'user' associated with the orders.
  const orders = await Order.find({})
    .populate('buyer', '_id name')
    .populate('seller', '_id name')

  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrder,
  updateOrderToPaid,
  getMyOrders,
  getMySelling,
  getOrders,
  updateOrderToDelivered,
}
