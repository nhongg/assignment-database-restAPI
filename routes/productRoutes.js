const express = require('express');
const router = express.Router();
const Product = require('../models/productModels');

// 
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 
router.post('/', async (req, res) => {
  const product = new Product({
    ProductID: req.body.ProductID,
    ProductName: req.body.ProductName,
    Description: req.body.Description,
    Price: req.body.Price,
    CateID: req.body.CateID
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update 
router.patch('/:id', getProduct, async (req, res) => {
  if (req.body.ProductID != null) {
    res.product.ProductID = req.body.ProductID;
  }
  if (req.body.ProductName != null) {
    res.product.ProductName = req.body.ProductName;
  }
  if (req.body.Description != null) {
    res.product.Description = req.body.Description;
  }
  if (req.body.Price != null) {
    res.product.Price = req.body.Price;
  }
  if (req.body.CateID != null) {
    res.product.CateID = req.body.CateID;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete 
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

module.exports = router;