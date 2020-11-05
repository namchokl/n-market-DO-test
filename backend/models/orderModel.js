import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      default: 'open', // open,  seller-accept, seller-delivered, close
    },
    estDeliverTime: {
      type: String,
      default: '-',
    },
    product: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      name: { type: String, required: true },
      image: { type: String, required: true },
      qty: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      price: { type: Number, required: true },
    },
    shipAddr: { type: String, required: true },
    note: { type: String },
    paymentMethod: { type: String, default: '-' },
    shipPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
