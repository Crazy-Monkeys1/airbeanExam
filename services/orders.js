import Order from "../models/order.js";

import { v4 as uuid } from "uuid";

export async function getAllOrders() {
  return await Order.find();
}

export async function getOrdersByID(userId) {
  try {
    return await Order.find({ userId: userId });
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function createOrder(cartId, userId) {
  try {
    const order = await Order.create({
      cartId: cartId,
      userId: userId,
      orderId: `order-${uuid().substring(0, 5)}`,
    });
    return order;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
