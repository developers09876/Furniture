import { User } from "../models/user.js";
import { whistlist } from "../models/whistlist.js";

import {
  hashPassword,
  createToken,
  checkPasswordMatch,
} from "../utils/auth.js";
import { HTTP_RESPONSE } from "../utils/config.js";
import nodemailer from "nodemailer";

import { google } from "googleapis";
import { message } from "antd";
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
    console.log("foundUser", foundUser);
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
// Step 2: Verify OTP and Complete Login
export const verifyLoginOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.loginOTP || user.otpExpiration < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (user.loginOTP !== otp) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    // Clear OTP fields after successful verification
    user.loginOTP = undefined;
    user.otpExpiration = undefined;

    await user.save();

    // Generate token after OTP verification
    const token = await createToken({ id: user.id });
    const userWithoutPassword = { ...user.toObject(), password: undefined };

    return res.status(200).json({ data: userWithoutPassword, token });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return res
      .status(500)
      .json({ message: "An error occurred during OTP verification" });
  }
};

export const createCart = async (req, res) => {
  try {
    const { id, cartItem } = req.body;
    const user = await User.findById(id);
    // console.log("user", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("caetItem", cartItem);

    user.Carts.push(cartItem);
    await user.save();

    res.status(200).json({ message: "Cart updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "cart not found" });
    }

    res
      .status(200)
      .json({ message: "Cart retrieved successfully", items: user.Carts });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart", error });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartItem = user.Carts.find((item) => item.productId === productId);
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    cartItem.quantity = quantity;
    cartItem.subTotal = cartItem.price * quantity;
    await user.save();

    res.status(200).json({
      message: "Quantity updated successfully",
      updatedCartItem: cartItem,
    });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  const { userID, productId } = req.params;
  console.log("UserID:", userID);
  console.log("ProductID:", productId);

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Carts = user.Carts.filter((item) => item.productId !== productId);

    await user.save();

    return res
      .status(200)
      .json({ message: "Item removed from cart", cart: user.Carts });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const clearCartItem = async (req, res) => {
  const userID = req.params.userID;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({ message: "user Not Found" });
    }
    user.Carts = [];
    await user.save();
    return res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.log("Error clearing cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const clearWhishlist = async (req, res) => {
  const userId = req.params.userId;
  console.log("userIdz", userId);
  try {
    const user = await User.findById(userId);
    if (!userId) {
      return res.status(404).json({ message: "user Not Found" });
    }
    user.Whishlist = [];
    await user.save();
    return res
      .status(200)
      .json({ message: "Whishlist Cleared successfully  " });
  } catch (error) {
    console.error("Error Clear Whishlist :", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createWhishlist = async (req, res) => {
  try {
    const { id, whistItem } = req.body; // id from the request body

    // Search by _id if you're using MongoDB's default unique identifier
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Whishlist not found" });
    }

    // Add the item to the cart array
    user.Whishlist.push(whistItem);
    await user.save();

    res.status(200).json({ message: "Whishlist updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating Whishlist", error });
  }
};

export const getWhishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Whishlist not found" });
    }

    res.status(200).json({
      message: "Whishlist retrieved successfully",
      items: user.Whishlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Whishlist", error });
  }
};

export const deleteWhishItem = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.Whishlist = user.Whishlist.filter(
      (item) => item.productId !== productId
    );
    await user.save();
    return res.status(200).json({
      message: "Item removed from wishlist",
      Whishlist: user.Whishlist,
    });
  } catch (error) {
    console.error("Error Removing item from wishlist:", error);
    return res.status(500).json({ message: "Server error" });
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
  console.log("Request Body:", req.body);
  try {
    const { id } = req.params;
    console.log("User", id);
    const { username, phoneNumber } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username: username, phoneNumber: phoneNumber },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

//enquiry api

// export async function enquiryUser(req, res, next) {
//   try {
//     const data = req.body;

//     const details = {
//       name: data.name,
//       email: data.email,
//       message: data.message,
//     };
//     console.log("Customer", details.email);
//     console.log("owner", process.env.EMAIL);
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       secure: true,
//       port: 465,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: ${details.email},
//       // from: "ganeshgm3113@gmil.com",
//       to: process.env.EMAIL,

//       subject: "Restropedic Mattress",
//       html: `
//     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//       <h2 style="color: #007bff;">New Enquiry</h2>
//       <p><strong>Name:</strong> ${details.name}</p>
//       <p><strong>Email:</strong> ${details.email}</p>
//       <p><strong>Message:</strong> ${details.message}</p>
//       <hr style="border: 1px solid #ddd;" />
//       <p>Thank you for reaching out to us!</p>
//       <p style="color: #007bff;">Restropedic Team</p>
//     </div>
//   `,
//     };
//     console.log("emailx", details.email);

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: " + info.response);

//     res.status(200).json({
//       message: "Enquiry sent successfully!",
//       details,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: ("Error sending enquiry", err),
//     });
//   }
// }

export async function enquiryUser(req, res) {
  console.log("req.body", req.body);
  try {
    const { name, email, message } = req.body;

    // Validate input data
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const details = {
      name,
      email,
      message,
    };

    console.log("Customer's Email (from field):", details.email);
    console.log("Owner's Email (to field):", process.env.EMAIL);

    // Check if environment variables are set
    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      throw new Error("EMAIL and EMAIL_PASSWORD must be set in the .env file");
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Configure mail options
    const mailOptions = {
      // from: process.env.EMAIL,
      // to: details.email,
      from: details.email,
      to: process.env.EMAIL,
      replyTo: details.email,
      subject: "Restropedic Mattress - New Enquiry",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #007bff;">New Enquiry</h2>
          <p><strong>Name:</strong> ${details.name}</p>
          <p><strong>Email:</strong> ${details.email}</p>
          <p><strong>Message:</strong> ${details.message}</p>
          <hr style="border: 1px solid #ddd;" />
          <p>Thank you for reaching out to us!</p>
          <p style="color: #007bff;">Restropedic Team</p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // Respond to client
    res.status(200).json({
      message: "Enquiry sent successfully!",
      details,
    });
  } catch (err) {
    console.error("Error sending enquiry:", err);

    // Respond with error
    res.status(500).json({
      message: "Error sending enquiry",
      error: err.message,
    });
  }
}

// export async function enquiryUser(req, res, next) {
//   try {
//     const data = req.body;

//     const details = {
//       name: data.name,
//       email: data.email, // This is the user's email entered in the form
//       message: data.message,
//     };

//     console.log("Customer", details.email);
//     console.log("Owner", process.env.EMAIL);

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       secure: true,
//       port: 465,
//       auth: {
//         user: process.env.EMAIL, // This is the email configured in your .env file
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: details.email, // Using user's email directly here
//       to: process.env.EMAIL, // Owner's email from the .env file
//       subject: "Restropedic Mattress - New Enquiry",
//       html: `
//         <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//           <h2 style="color: #007bff;">New Enquiry</h2>
//           <p><strong>Name:</strong> ${details.name}</p>
//           <p><strong>Email:</strong> ${details.email}</p>
//           <p><strong>Message:</strong> ${details.message}</p>
//           <hr style="border: 1px solid #ddd;" />
//           <p>Thank you for reaching out to us!</p>
//           <p style="color: #007bff;">Restropedic Team</p>
//         </div>
//       `,
//     };

//     console.log("Email (from field):", details.email);

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: " + info.response);

//     res.status(200).json({
//       message: "Enquiry sent successfully!",
//       details,
//     });
//   } catch (err) {
//     console.error("Error sending enquiry:", err);
//     res.status(500).json({
//       message: "Error sending enquiry",
//       error: err,
//     });
//   }
// }

// reset password

// --------
// export const registerUser = async (req, res) => {
//   console.log("reqq.body", req.body);
//   const { username, email, password, phoneNumber } = req.body;

//   if (!password) {
//     return res
//       .status(HTTP_RESPONSE.BAD_REQUEST.CODE)
//       .json({ error: "Password is required" });
//   }

//   const passwordHashed = await hashPassword(password);

//   try {
//     const registeredUser = await User.findOne({ email: email });
//     if (registeredUser) {
//       return res.status(HTTP_RESPONSE.BAD_REQUEST.CODE).json({
//         message: "A user has already registered with this email address.",
//       });
//     } else {
//       const newUser = new User({
//         username,
//         email,
//         phoneNumber,
//         password: passwordHashed,
//       });

//       await newUser.save();

//       const userWithoutpassword = await createUserWithoutPass(newUser);
//       const token = await createToken({ id: userWithoutpassword.id });

//       return res.status(HTTP_RESPONSE.OK.CODE).json({
//         data: userWithoutpassword,
//         token,
//         message: "User created Succesfully",
//       });
//     }
//   } catch (err) {
//     console.log("error inside register user!", err);
//   }
// };
//-------------------
// export async function resetUsers(req, res) {
//   try {
//     const data = req.body;
//     console.log("data", data);
//     const existUser = await User.findOne({ email: data.email });
//     console.log("existUser", existUser);
//     if (!existUser) {
//       return res.status(400).json({
//         message: "User  NOt found",
//         status: "Failed",
//       });
//     }

//     return res.status(200).json({
//       message: "User found",
//       data: existUser,
//       status: "Successful",
//     });
//   } catch (err) {
//     console.error("Error during login:", err);
//     return res.status(500).json({
//       message: "An error occurred during reset",
//       status: "Failed",
//     });
//   }
// }

export async function resetUsers(req, res) {
  try {
    const { email } = req.body;
    console.log("Email provided for reset:", email);

    // Check if the user exists in the database
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({
        message: "User not found",
        status: "Failed",
      });
    }

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("Generated OTP:", otp);

    // Set up the nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "ferilcrosshurdle@gmail.com",
        pass: "ntjlgqizfbebdshd", // Use environment variables for sensitive information
      },
    });

    // Define the mail options
    const mailOptions = {
      from: "ferilcrosshurdle@gmail.com",
      to: email,
      subject: "Password Reset Verification Code",
      text: `Your OTP code is: ${otp}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log("Error sending OTP email:", error);
        return res.status(500).json({
          message: "Failed to send OTP email",
          status: "Failed",
        });
      } else {
        console.log("OTP email sent:", info.response);

        // Update the user record with the OTP in the database
        await User.findByIdAndUpdate(
          existUser._id,
          { forgetPasswordCode: otp },
          { new: true }
        );

        return res.status(200).json({
          message: "OTP sent successfully",
          status: "Successful",
          userId: existUser._id,
        });
      }
    });
  } catch (err) {
    console.error("Error during password reset process:", err);
    return res.status(500).json({
      message: "An error occurred during reset",
      status: "Failed",
    });
  }
}

export async function checkVerifivationCode(req, res) {
  try {
    const { email, code } = req.body;
    console.log("hello", req.body);
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email does not exist. Try again!",
        status: "Failed",
      });
    }

    // Compare the stored OTP with the one provided
    if (user.forgetPasswordCode === Number(code)) {
      return res.status(200).json({
        message: "Verification code matched",
        status: "Successful",
      });
    } else {
      return res.status(400).json({
        message: "Verification code mismatched",
        status: "Failed",
      });
    }
  } catch (err) {
    console.error("Error verifying code:", err);
    return res.status(500).json({
      message: "An error occurred during verification",
      status: "Failed",
    });
  }
}

export async function getOneUser(req, res) {
  try {
    const data = req.body;
    const user = await User.findOne({
      id: data._id,
    });
    console.log("oneuser", user);
    if (!user) {
      return res.status(400).json({
        message: "User  NOt found",
        status: "Failed",
      });
    }

    return res.status(200).json({
      message: "User found",
      data: user,
      status: "Successful",
    });
  } catch (err) {
    console.error("Error during login:", err);
  }
}

export const whistlistUser = async (req, res) => {
  try {
    const newWhistlist = new whistlist(req.body);
    const savedWhistlist = await newWhistlist.save();
    res.status(200).json(savedWhistlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
