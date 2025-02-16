import { User } from "../models/user.js";
import { whistlist } from "../models/whistlist.js";

import {
  hashPassword,
  createToken,
  checkPasswordMatch,
} from "../utils/auth.js";
import { HTTP_RESPONSE } from "../utils/config.js";
import nodemailer from "nodemailer";

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
        address_details: [
          {
            pincode: " ",
            address: " ",
          },
        ],
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
  } catch (err) {}
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

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
         return res
      .status(500)
      .json({ message: "An error occurred during OTP verification" });
  }
};

export const createCart = async (req, res) => {
  try {
    const { id, cartItem } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //  
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
         res.status(500).json({ message: "Server Error: " + error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  const { userID, productId } = req.params;
  //    //  
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
    //      return res.status(500).json({ message: "Server error" });
  }
};

export const clearWhishlist = async (req, res) => {
  const userId = req.params.userId;
  //    try {
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
         return res.status(500).json({ message: "Server error" });
  }
};

export const createWhishlist = async (req, res) => {
  try {
    const { id, whistItem } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Whishlist not found" });
    }
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
    //      const deletedCategory = await User.findByIdAndDelete({ _id: id });

    if (!deletedCategory) {
      return res.status(404).json({ message: "User not found" }); // If the category doesn't exist
    }

    res.status(200).json({ message: "User deleted successfully" }); // Success response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  //    try {
    const { id } = req.params;
    //      const { username, phoneNumber, pincode, address } = req.body;
    //      //      const updateFields = {
      username,
      phoneNumber,
    };
    if (pincode && address) {
      updateFields.address_details = [{ pincode, address }];
    }

    //      const updatedUser = await User.findByIdAndUpdate(id, {
      $set: updateFields,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
         res.status(500).json({ message: "Server Error: " + error.message });
  }
};

export async function enquiryUser(req, res) {
  //    try {
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

    //      //  
    if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
      throw new Error("EMAIL and EMAIL_PASSWORD must be set in the .env file");
    }

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

    const info = await transporter.sendMail(mailOptions);
    //  
    res.status(200).json({
      message: "Enquiry sent successfully!",
      details,
    });
  } catch (err) {
     
    res.status(500).json({
      message: "Error sending enquiry",
      error: err.message,
    });
  }
}

export async function resetUsers(req, res) {
  try {
    const { email } = req.body;
    //      //  
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
    //  
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
        //          return res.status(500).json({
          message: "Failed to send OTP email",
          status: "Failed",
        });
      } else {
        //          //  
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
         return res.status(500).json({
      message: "An error occurred during reset",
      status: "Failed",
    });
  }
}

export async function checkVerifivationCode(req, res) {
  try {
    const { email, code } = req.body;
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
         return res.status(500).json({
      message: "An error occurred during verification",
      status: "Failed",
    });
  }
}

export async function getOneUser(req, res) {
  try {
    const data = req.params;
    const user = await User.findOne({
      _id: data.id,
    });
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
         return res.status(500).json({
      message: "An error occurred during reset",
      status: "Failed",
    });
  }
}
