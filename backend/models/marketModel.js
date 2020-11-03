import mongoose from 'mongoose'

const marketSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Address: {
      address: { type: String, required: true },
      district: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true, default: 'ไทย' },
      // gpsLocation: { type: String, required: true },
    },
    image: {
      type: String,
    },
    policy: { type: String },
    numPeople: {
      type: Number,
      default: 0,
    },
    numProducts: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
)

const Market = mongoose.model('Market', marketSchema)

export default Market
