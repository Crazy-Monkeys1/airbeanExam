import Order from "../models/order.js";

export async function getAllOrders() {
  return await Order.find();
}

export async function getOrderByID(userId) {
  try {
    return await Order.findOne({ userId: userId });
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function createOrder(cartId) {
  try {
    const order = await Order.create({
      cartId: cartId,
      userId: cartId,
    });
    return order;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
