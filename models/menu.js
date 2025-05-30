import mongoose from "mongoose";

const Schema = mongoose.Schema;

const menuSchema = new Schema(
  {
    prodId: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { collection: "menu" }
);

const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
