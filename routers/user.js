var express = require("express");
const UserController = require("../controllers/UserController");

var router = express.Router();

router.get("/", UserController.get);
// router.get("/:id", UserController.add);
router.post("/", UserController.add);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;