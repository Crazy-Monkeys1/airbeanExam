import { Router } from "express";
import { getAllMenuItems } from "../services/menu.js";

const router = Router();

// GET all menu items
router.get("/", async (req, res, next) => {
  const menu = await getAllMenuItems();
  if (menu) {
    res.json({
      success: true,
      menu: menu,
    });
  } else {
    next({
      status: 404,
      message: "No menu items found",
    });
  }
});

export default router;
