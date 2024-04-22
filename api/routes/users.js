const router = require("express").Router();
const { updateUser, deleteUser, getUser, getAllUsers } = require("../controllers/users");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/find/:id", getUser);
router.get('/', getAllUsers)

module.exports = router;