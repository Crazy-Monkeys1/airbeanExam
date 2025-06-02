import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  prodId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    cartId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    orderItems: [orderItemSchema],
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
