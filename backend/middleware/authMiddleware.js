// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.protect = async (req, res, next) => {
//     let token = req.headers.authorization?.split(" ")[1]
//     if(!token){
//         return  res.status(401).json({message: "Not authorized, no token"})
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         req.user = await User.findById(decoded.id).select('-password')
//         next()

//     } catch (error) {
//          res.status(401).json({ message: "Not authorized, token failed" });
//     }
// }



const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user and attach to request
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // Continue to next middleware/route
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid", error: error.message });
  }
};
