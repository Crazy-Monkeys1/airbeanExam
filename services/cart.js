import Cart from "../models/cart.js";

export default async function getAllCarts() {
  try {
    const carts = await Cart.find();
    return carts;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

async function getOrCreateCart(userId) {
  try {
    let cart = await Cart.findOne({ cartId: userId });
    if (!cart) {
      cart = await Cart.create({
        cartId: userId,
        userId: userId,
        items: [],
      });
    }
    return cart;
  } catch (error) {
    console.log("Nu blev det fel här!");

    console.log(error.message);
    return null;
  }
}

export async function updateCart(userId, menuItem) {
  try {
    const cart = await getOrCreateCart(userId);
    if (!cart) {
      throw new Error("Could not retrieve cart");
    }

    const item = cart.items.find((i) => i.prodId === menuItem.prodId);

    if (item) {
      item.qty = menuItem.qty;
    } else {
      cart.items.push(menuItem);
    }

    if (menuItem.qty === 0) {
      cart.items = cart.items.filter((i) => i.prodId !== menuItem.prodId);
    }

    await cart.save();
    return cart;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function getCartById(cartId) {
  try {
    return await Cart.findOne({ cartId: cartId });
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
