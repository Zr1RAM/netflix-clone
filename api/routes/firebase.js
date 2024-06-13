const checkPrivileges = require("../middleware/authorization");
const { setCustomClaims, addUser } = require("../controllers/firebase");

const router = require("express").Router();

router.use(checkPrivileges);
router.post("/setCustomClaims", setCustomClaims);
router.post("/addUser", addUser)

module.exports = router;