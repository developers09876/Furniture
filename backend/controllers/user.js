import { User } from "../models/user.js";
// import { whistlists } from "../models/whistlist.js";

import {
  hashPassword,
  createToken,
  checkPasswordMatch,
} from "../utils/auth.js";
import { HTTP_RESPONSE } from "../utils/config.js";
import nodemailer from "nodemailer";

import { google } from "googleapis";
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
    if (registeredUser) {
      return res.status(HTTP_RESPONSE.BAD_REQUEST.CODE).json({
        message: "A user has already registered with this email address.",
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

      return res.status(HTTP_RESPONSE.OK.CODE).json({
        data: userWithoutpassword,
        token,
        message: "User created Succesfully",
      });
    }
  } catch (err) {
    console.log("error inside register user!", err);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("name", email, password);

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(HTTP_RESPONSE.NOT_FOUND.CODE)
        .json({ error: "user not found" });
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
  try {
    const allUser = await User.find();

    res.status(200).json(allUser);
  } catch {
    // res.status(500).json({ message: error.message });
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

//enquiry api

export async function enquiryUser(req, res, next) {
  try {
    const data = req.body;

    const details = {
      name: data.name,
      email: data.email,
      message: data.message,
    };
    console.log("details", details);
    console.log("process.env.EMAIL", process.env.EMAIL);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: "ganeshgm3113@gmail.com",
      // to: ${details.email},
      subject: "Furniture Enquiry",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #007bff;">New Enquiry</h2>
      <p><strong>Name:</strong> ${details.name}</p>
      <p><strong>Email:</strong> ${details.email}</p>
      <p><strong>Message:</strong> ${details.message}</p>
      <hr style="border: 1px solid #ddd;" />
      <p>Thank you for reaching out to us!</p>
      <p style="color: #007bff;">Furniture Team</p>
    </div>
  `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    res.status(200).json({
      message: "Enquiry sent successfully!",
      details,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: ("Error sending enquiry", err),
    });
  }
}

// reset password

export async function resetUsers(req, res) {
  try {
    const data = req.body;
    const existUser = await User.findOne({ email: data.email });
    console.log("existUser", existUser);
    if (!existUser) {
      return res.status(400).json({
        message: "User  NOt found",
        status: "Failed",
      });
    }

    return res.status(200).json({
      message: "User found",
      data: existUser,
      status: "Successful",
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({
      message: "An error occurred during reset",
      status: "Failed",
    });
  }
}

//whistlist

// export const whistlistUser = async (req, res) => {
//   try {
//     const newWhistlist = new whistlists(req.body);
//     console.log("first", newWhistlist);
//     const savedWhistlist = await newWhistlist.save();
//     res.status(200).json(savedWhistlist);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateWishlist = async (req, res) => {
//   try {
//     const { id } = req.params; // Extract the wishlist ID from the URL params

//     // Validate the request body (optional but recommended)
//     if (!req.body || Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: "Invalid request. Data is missing." });
//     }

//     // Find the wishlist by ID and update it with new data from the request body
//     const updatedWishlist = await whistlists.findByIdAndUpdate(id, req.body, {
//       new: true, // Return the updated document
//       runValidators: true, // Ensure the update respects the schema validation
//     });

//     // If the wishlist with the given ID was not found
//     if (!updatedWishlist) {
//       return res.status(404).json({ message: "Wishlist not found" });
//     }

//     // Return the updated wishlist as a successful response
//     res.status(200).json(updatedWishlist);
//   } catch (error) {
//     console.error("Error updating wishlist:", error.message);

//     // Return a 500 status with the error message
//     res.status(500).json({ message: "Failed to update wishlist. " + error.message });
//   }
// };




// Assuming you already have hashPassword defined somewhere in your project
export async function resetUser(req, res) {
  try {
    const { email, newPassword } = req.body;
    // Find user by email
    const existUser = await User.findOne({ email });
    console.log("existUser", existUser);

    // Check if the user exists
    if (!existUser) {
      return res.status(400).json({
        message: "User not found",
        status: "Failed",
      });
    }

    // Hash the new password
    const passwordHashed = await hashPassword(newPassword);

    // Update the user's password
    existUser.password = passwordHashed;
    await existUser.save();

    // Respond with success
    return res.status(200).json({
      message: "Password reset successful",
      status: "Successful",
    });
  } catch (err) {
    console.error("Error during password reset:", err);
    return res.status(500).json({
      message: "An error occurred during reset",
      status: "Failed",
    });
  }
}
