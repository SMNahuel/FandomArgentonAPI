const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const pagesRoute = require("./page");
const themeRoute = require("./theme");
const contentRoute = require("./content");
const categoryRoute = require("./category");

router.use("/", pagesRoute);
router.use("/auth", authRoute);
router.use("/theme", themeRoute);
router.use("/content", contentRoute);
router.use("/category", categoryRoute);

module.exports = router;
