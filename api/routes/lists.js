const { addList } = require("../controllers/lists");

const router = require("express").Router();

router.post('/', addList);

module.exports = router