import Menu from "../models/menu.js";

export async function getAllMenuItems() {
  try {
    const menu = await Menu.find();
    return menu;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getMenuItem(prodId) {
  try {
    const menuItem = await Menu.findOne({ prodId: prodId });
    return menuItem;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
