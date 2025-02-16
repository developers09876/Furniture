import jwt from "jsonwebtoken";

// export const isLoggedIn = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: "Access denied. No token provided." });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.SECRET);
//     // req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token." });
//   }
// };

export const isLoggedIn = (req, res, next) => {
  // Check for the authorization header and split it to extract the token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // Extract the token from the "Bearer <token>" format
  const token = authHeader.split(" ")[1];
  try {
    // Verify the token using the secret key from your environment variables
    const verified = jwt.verify(token, process.env.SECRET);
    // If verification is successful, attach the user data to the request object
    req.user = verified; // You can access user data in subsequent routes

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid or expired token
    return res.status(400).json({ error: "Invalid or expired token." });
  }
};
