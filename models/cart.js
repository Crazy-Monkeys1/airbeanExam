import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    cartId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    guestId: {
      type: String,
    },
    items: [
      {
        prodId: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        title: String,
        desc: String,
        price: Number,
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
