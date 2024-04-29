const { addList, deleteList, getLists } = require("../controllers/lists");
const checkPrivileges = require("../middleware/authorization");

const router = require("express").Router();

//Routes that dont require admin privileges
router.get('/', getLists);

// Routes that require admin privileges
router.use(checkPrivileges)
router.post('/', addList);
router.delete('/:id', deleteList);

module.exports = router