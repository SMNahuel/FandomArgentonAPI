const express = require("express");
const Theme = require("../schema/theme");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Theme.find();
  res.status(200).json(data);
});

router.post("/", authorization.isAdmin, async (req, res) => {
  const { name, category } = req.body;
  console.log(req.body)
  try {
    const existingTheme = await Theme.findOne({
      name,
    });

    if (existingTheme) {
      return res.status(400).json({ message: "Theme already exists" });
    }

    const newTheme = new Theme({
      name,
      video_url: category.includes("video_url"),
      image: category.includes("imagenes"),
      text: category.includes("texto"),
    });
    
    await newTheme.save();
    res.status(201).json({ message: "Theme created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authorization.isAdmin, async (req, res) => {
  const { id } = req.params;

  if (id) {
    const result = await Theme.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Theme not found" });
    }
    const data = await Theme.find();
    res.status(200).json({ message: "Theme deleted successfully", data });
  } else {
    res.status(500).json({ message: "Error deleting Theme", error });
  }
});


module.exports = router;
