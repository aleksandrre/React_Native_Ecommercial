import { User } from "../models/usersModel.js";

export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const { id } = req.user;
    //find the user by the id
    const user = await User.findById(id);
    console.log("ki");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    console.log("vera");
    user.addresses.push(address);
    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;

    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
};
