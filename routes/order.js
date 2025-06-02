import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByID,
} from "../services/orders.js";
const router = Router();
import Cart from "../models/cart.js";

// GET all orders
router.get("/", async (req, res, next) => {
  const orders = await getAllOrders();
  if (orders) {
    res.json({
      success: true,
      orders: orders,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Can't find any orders",
    });
  }
});

// GET order by ID
router.get("/:id", async (req, res, next) => {
  const userId = req.params.id;
  const order = await getOrdersByID(userId);
  if (order) {
    res.json({
      sucess: true,
      order: order,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Can't find order with that ID",
    });
  }
});

// POST new order

router.post("/", async (req, res, next) => {
  try {
    const { cartId } = req.body;

    const cart = await Cart.findOne({ cartId: cartId });

    if (!cartId) {
      res.json({
        success: false,
        message: "Cart not found",
      });
    }

    const order = await createOrder(cartId, cart.items);
    order.orderItems.push(...cart.items);

    await order.save();

    res.json({
      success: true,
      order: order,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      message: error.status,
    });
  }
});

export default router;
