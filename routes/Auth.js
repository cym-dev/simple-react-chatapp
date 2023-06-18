const router = require("express").Router(),
  { login, save } = require("../controllers/Auth"),
  { protect } = require("../middleware");

router.get("/login", login).post("/save", save);

module.exports = router;
