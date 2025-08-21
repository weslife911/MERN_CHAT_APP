const { Router } = require("express");
const protectedRoute = require("../middlewares/AuthMiddleware");
const { getUsersForSidebar, getMessages, sendMessage } = require("../controllers/MessageController");

const router = Router();

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessages);

router.post("/send/:id", protectedRoute, sendMessage);

module.exports = router;