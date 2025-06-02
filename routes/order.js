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
  try {
    const orders = await getOrdersByID(userId);

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    next(error);
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
