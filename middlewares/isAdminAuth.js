const isAdminAuth = (req, res, next) => {
  console.log(req.user.role);
  const role = req.user.role;
  if (role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

module.exports = isAdminAuth;
