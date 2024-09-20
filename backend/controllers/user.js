import { User } from "../models/user.js";
import {
  hashPassword,
  createToken,
  checkPasswordMatch,
} from "../utils/auth.js";
import { HTTP_RESPONSE } from "../utils/config.js";

// create user without password=============================
const createUserWithoutPass = async (user) => {
  const newUser = {
    username: user.username,
    email: user.email,
    id: user.id,
  };
  return newUser;
};

// create user=============================================
export const registerUser = async (req, res) => {
  console.log("reqq.body", req.body);
  const { username, email, password, phoneNumber } = req.body;

  if (!password) {
    return res
      .status(HTTP_RESPONSE.BAD_REQUEST.CODE)
      .json({ error: "Password is required" });
  }

  const passwordHashed = await hashPassword(password);

  try {
    const registeredUser = await User.findOne({ email: email });
    console.log("vantea", registeredUser);
    if (registeredUser) {
      return res.status(HTTP_RESPONSE.BAD_REQUEST.CODE).json({
        email: "A user has already registered with this email address.",
      });
    } else {
      const newUser = new User({
        username,
        email,
        phoneNumber,
        password: passwordHashed,
      });

      await newUser.save();

      const userWithoutpassword = await createUserWithoutPass(newUser);
      const token = await createToken({ id: userWithoutpassword.id });

      return res
        .status(HTTP_RESPONSE.OK.CODE)
        .json({ data: userWithoutpassword, token });
    }
  } catch (err) {
    console.log("error inside register user!", err);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(HTTP_RESPONSE.NOT_FOUND.CODE)
        .json({ error: "Invalid email or password..." });
    }

    // check password match
    const matchedPassword = await checkPasswordMatch(
      password,
      foundUser.password
    );
    if (!matchedPassword) {
      return res
        .status(HTTP_RESPONSE.UNAUTHORIZED.CODE)
        .json({ error: "Invalid email or password..." });
    }

    const userWithoutPassword = await createUserWithoutPass(foundUser);
    const token = await createToken({ id: userWithoutPassword.id });

    return res
      .status(HTTP_RESPONSE.OK.CODE)
      .json({ data: userWithoutPassword, token });
  } catch (err) {
    console.log("An error inside user login.", err);
    return res
      .status(HTTP_RESPONSE.INTERNAL_ERROR.CODE)
      .json(HTTP_RESPONSE.INTERNAL_ERROR.MESSAGE);
  }
};

export const createCart = async (req, res) => {
  try {
    const { id, cartItem } = req.body; // Expect email and cartItem in the request body

    // Find the user by email (or you can use another unique identifier)
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Carts.push(cartItem);

    await user.save();

    res.status(200).json({ message: "Cart updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

export const getAllUser = async (req, res) => {
  console.log("resss", req.body);
  const token = req.headers.authorization;

  try {
    const allUser = await User.find();

    res.status(200).json(allUser);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const deletedCategory = await User.findByIdAndDelete({ _id: id });

    if (!deletedCategory) {
      return res.status(404).json({ message: "User not found" }); // If the category doesn't exist
    }

    res.status(200).json({ message: "User deleted successfully" }); // Success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  console.log("vantea");
  try {
    const { id } = req.params;
    const { username, phoneNumber } = req.body;
    const users = await User.findById(id);

    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) users.username = username;
    if (phoneNumber) users.phoneNumber = phoneNumber;
    const updatedCategory = await users.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid User ID" });
    }

    res.status(500).json({ message: "Server Error: " + error.message });
  }
};
