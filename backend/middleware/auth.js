// middleware/auth.js

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

const authMiddleware = (req, res, next) => {
  const { name, password } = req.body;
  console.log(req.body.data, 'ggg fffffffffffffffff--', name, password);
  // Basic admin authentication
  if (name === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    console.log("Authenticated");
    next(); // Proceed to the next route handler
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = authMiddleware;
