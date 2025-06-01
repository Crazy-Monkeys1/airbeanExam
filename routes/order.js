import { Router } from "express";
import { createOrder, getAllOrders, getOrdersByID } from "../services/orders.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = Router();

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
    if (!cartId) {
    }

    const order = await createOrder(cartId);
    res.json({
      success: true,
      order: order,
    });
  } catch (error) {
    res.json({
      message: error.status,
    });
  }
});

export default router;
