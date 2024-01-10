import { Order } from "../models/orderModel.js";
import { User } from "../models/usersModel.js";

export const addOrder = async (req, res) => {
  console.log("whaii");
  try {
    const { id } = req.user;
    const { cartItems, totalPrice, shippingAddress, paymentMethod } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: id,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { id } = req.user;

    const orders = await Order.find({ user: id }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.log("error creating orders", error);

    res.status(500).json({ message: "error" });
  }
};
