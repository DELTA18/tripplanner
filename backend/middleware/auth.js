// middleware/auth.js

// Hardcoded admin credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing credentials" });
  }

  const base64Credentials = authHeader.split(" ")[1]; // Format: "Basic <Base64String>"
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username, password] = credentials.split(":");
  console.log(username, password);

  // Check if username and password match
  if (username === ADMIN_USERNAME && password !== ADMIN_PASSWORD) {
      return res.status(403).json({ message: "Forbidden: Invalid password" });s
  }
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return next(); // Allow access to the next step (admin routes)
  } else {
    return res.status(403).json({ message: "Forbidden: Invalid credentials" });
  }
};

module.exports = basicAuth;
