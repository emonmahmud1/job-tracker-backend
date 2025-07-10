const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
try{
    console.log(req.user);
  if(!req.user){
    return res.status(403).json({message:"unauthorized access"})
  }
    res.status(200).json({
      message: "User data retrieved successfully",
      user: req.user,
    });
}catch(error){
    return res.status(500).json({message:"internal server error"})
}
});

module.exports = router;
