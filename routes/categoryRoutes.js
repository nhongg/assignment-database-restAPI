const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModels');

// 
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 
router.post('/', async (req, res) => {
  const category = new Category({
    CateID: req.body.CateID,
    CateName: req.body.CateName
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//
router.get('/:id', getCategory, (req, res) => {
  res.json(res.category);
});

// Update 
router.patch('/:id', getCategory, async (req, res) => {
  if (req.body.CateID != null) {
    res.category.CateID = req.body.CateID;
  }
  if (req.body.CateName != null) {
    res.category.CateName = req.body.CateName;
  }

  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete 
router.delete('/:id', getCategory, async (req, res) => {
  try {
    await res.category.remove();
    res.json({ message: 'Category xóa' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Category không thấy' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.category = category;
  next();
}

module.exports = router;