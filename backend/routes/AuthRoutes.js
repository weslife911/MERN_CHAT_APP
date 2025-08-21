const { Router } = require("express");
const { registerController, loginController, checkAuth, updateProfile, getUsers } = require("../controllers/AuthController");
const protectedRoute = require("../middlewares/AuthMiddleware");

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/check", protectedRoute, checkAuth);
router.put("/update-profile", protectedRoute, updateProfile);
router.get("/users", protectedRoute, getUsers)

module.exports = router;