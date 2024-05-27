const { jwtDecode } = require("jwt-decode");
const express = require("express");
const router = express.Router();

const authorization = require("../middleware/authorization");
const Content = require("../schema/content");

router.get("/", async (req, res) => {
  const data = await Content.find();
  res.status(200).json(data);
});

router.get("/:author", async (req, res) => {
  const data = await Content.find({'author': req.params.author});
  res.status(200).json(data);
});


router.post("/", authorization.isCreatorOrAdmin, async (req, res) => {
  const { theme, form } = req.body;
  const { authorization } = req.headers;
  const decoded = jwtDecode(authorization);

  if (theme.video_url && !form.video_url) {
    return res.status(400).json({ message: "Video not exists" });
  }
  if (theme.image && !form.image) {
    return res.status(400).json({ message: "Image not exists" });
  }
  if (theme.text && !form.text) {
    return res.status(400).json({ message: "Document not exists" });
  }

  const newContent = new Content({
    title: form.title,
    content: form.content,
    image: form.image,
    video_url: form.video_url,
    document: form.document,
    theme: theme.name,
    author: decoded.user.nickname,
  });

  await newContent.save();

  res.status(201).json({ message: "Content created successfully" });
});

router.put("/:id", authorization.isCreatorOrAdmin, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Datos que se quieren actualizar

  if (id) {
    const result = await Content.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "Content not found" });
    }
    const data = await Content.find({'author': req.body.author});
    
    res.status(200).json({ message: "Content deleted successfully", data });
  } else {
    res.status(500).json({ message: "Error deleting content", error });
  }
});

router.delete("/:id", authorization.isAdmin, async (req, res) => {
  const { id } = req.params;

  if (id) {
    const result = await Content.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Content not found" });
    }
    const data = await Content.find();
    res.status(200).json({ message: "Content deleted successfully", data });
  } else {
    res.status(500).json({ message: "Error deleting content", error });
  }
});

module.exports = router;
