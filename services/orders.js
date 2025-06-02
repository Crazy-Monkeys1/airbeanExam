import Order from "../models/order.js";
import Cart from "../models/cart.js";

import { v4 as uuid } from "uuid";

export async function getAllOrders() {
  try {
    return await Order.find();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getOrdersByID(userId) {
  try {
    return await Order.find({ userId: userId });
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function createOrder(userId, orderItems) {
  try {
    const totalPrice = orderItems.reduce((sum, item) => {
      return sum + item.price * item.qty;
    }, 0);

    const order = await Order.create({
      cartId: userId,
      userId: userId,
      orderId: `order-${uuid().substring(0, 5)}`,
      orderItems: [],
      price: totalPrice,
    });
    await Cart.deleteOne({ cartId: userId });
    return order;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
