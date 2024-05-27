const express = require("express");
const router = express.Router();
const Category = require("../schema/category");
const authorization = require("../middleware/authorization");

router.get("/", async (req, res) => {
  const data = await Category.find();
  res.status(200).json(data);
});

router.post("/", authorization.isAdmin, async (req, res) => {
  const { name, typeDto } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Category({
      name,
      typeDto,
    });
    await newCategory.save();

    const data = await Category.find();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authorization.isAdmin, async (req, res) => {
  const { id } = req.params;

  if (id) {
    const result = await Category.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Category not found" });
    }
    const data = await Category.find();
    res.status(200).json({ message: "Category deleted successfully", data });
  } else {
    res.status(500).json({ message: "Error deleting category", error });
  }
});

module.exports = router;
