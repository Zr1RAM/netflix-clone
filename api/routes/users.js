const router = require("express").Router();
const { updateUser, deleteUser, getUser, getAllUsers, getStats } = require("../controllers/users");

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/find/:id", getUser);
router.get('/', getAllUsers);
router.get('/stats', getStats);

module.exports = router;