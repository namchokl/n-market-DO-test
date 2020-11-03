import asyncHandler from 'express-async-handler'
import Market from '../models/marketModel.js'
import User from '../models/userModel.js'

// @desc    Fetch all products
// @route   GET /api/markets
// @access  Public
const getMarkets = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Market.countDocuments({ ...keyword })
  const markets = await Market.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ markets, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single market
// @route   GET /api/markets/:id
// @access  Public
const getMarketById = asyncHandler(async (req, res) => {
  const market = await Market.findById(req.params.id)

  if (market) {
    res.json(market)
  } else {
    res.status(404)
    throw new Error('Market not found')
  }
})

// @desc    Create a market
// @route   POST /api/markets
// @access  Private
const createMarket = asyncHandler(async (req, res) => {
  // const market = new Market({
  //   name: 'หมู่บ้านพฤกษ์ลดา 2 รังสิตคลองสี่',
  //   Address: {
  //     address: 'หมู่บ้านพฤกษ์ลดา 2 รังสิตคลองสี่',
  //     district: 'ลำลูกกา',
  //     province: 'ปทุมธานี',
  //     postalCode: '12150',
  //   },
  //   creator: req.user._id,
  //   image: '/images/sample.jpg',
  //   policy: 'สมาชิกห้ามโพสต์สินค้าผิดกฎหมาย',
  // })

  console.log('... createMarket')
  const market = new Market(req.body)
  market.creator = req.user._id

  try {
    const createdMarket = await market.save()
    if (createdMarket) {
      res.status(201).json(createdMarket)
    } else {
      res.status(400)
      throw new Error('Market info is invalid')
    }
  } catch (e) {
    res.status(400)
    throw new Error('กรุณาใส่ข้อมูลให้ครบถ้วน')
  }
})

// @desc    Update market
// @route   PUT /api/markets/:id
// @access  Private
const updateMarket = asyncHandler(async (req, res) => {
  const {
    name,
    Address, // : {address, district, province, postalCode, country},
    image,
    policy,
  } = req.body

  const market = await Market.findById(req.params.id)

  if (market) {
    market.name = name
    market.Address = Address
    market.image = image
    market.policy = policy

    const updatedMarket = await market.save()
    res.json(updatedMarket)
  } else {
    res.status(404)
    throw new Error('Market not found')
  }
})

// @desc    join market
// @route   POST /api/markets/:id/join
// @access  Private
const joinMarket = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const marketId = req.params.id

  console.log('... joinMarket')
  // const market = await Market.findById(marketId)
  // const user = await User.findById(userId).select('-password')

  // use join promises
  const p_market = Market.findById(marketId)
  const p_user = User.findById(userId).select('-password')

  Promise.all([p_market, p_user]).then(async (data) => {
    const market = data[0]
    const user = data[1]

    if (market && user) {
      if (!user.markets.includes(marketId)) {
        user.markets.push(marketId)
        user.save()
      }

      if (!market.members.includes(userId)) {
        market.members.push(userId)
        market.numPeople = market.members.length
        const updatedMarket = await market.save()
        res.json({ market: updatedMarket, user })
      } else {
        res.json({ market, user })
      }
    } else {
      res.status(404)
      if (user) {
        throw new Error('Market not found')
      } else {
        throw new Error('User not found')
      }
    }
  })
})

// @desc    join market
// @route   POST /api/markets/:id/leave
// @access  Private
const leaveMarket = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const marketId = req.params.id

  console.log('... leaveMarket')
  // const market = await Market.findById(marketId)
  // const user = await User.findById(userId).select('-password')

  // use join promises
  const p_market = Market.findById(marketId)
  const p_user = User.findById(userId).select('-password')

  Promise.all([p_market, p_user]).then(async (data) => {
    const market = data[0]
    const user = data[1]

    if (market && user) {
      if (user.markets.includes(marketId)) {
        const marketIdx = user.markets.indexOf(marketId)

        user.markets.splice(marketIdx, 1)
        user.save()
      }

      if (market.members.includes(userId)) {
        const memberIdx = market.members.indexOf(userId)

        market.members.splice(memberIdx, 1)
        market.numPeople = market.members.length
        const updatedMarket = await market.save()
        res.json({ market: updatedMarket, user })
      } else {
        res.json({ market, user })
      }
    } else {
      res.status(404)
      if (user) {
        throw new Error('Market not found')
      } else {
        throw new Error('User not found')
      }
    }
  })
})

export {
  getMarkets,
  getMarketById,
  createMarket,
  updateMarket,
  joinMarket,
  leaveMarket,
}
