const express = require('express');
const router = express.Router();
const Bill = require('../models/billModels');

// Lấy tất cả các hóa đơn
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo một hóa đơn mới
router.post('/', async (req, res) => {
  const { BID, Date, Email } = req.body;

  try {
    const bill = new Bill({
      BID,
      Date,
      Email
    });

    const newBill = await bill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Lấy thông tin của một hóa đơn cụ thể
router.get('/:id', getBill, (req, res) => {
  res.json(res.bill);
});

// Cập nhật thông tin của một hóa đơn
router.patch('/:id', getBill, async (req, res) => {
  const { BID, Date, Email } = req.body;

  if (BID != null) {
    res.bill.BID = BID;
  }
  if (Date != null) {
    res.bill.Date = Date;
  }
  if (Email != null) {
    res.bill.Email = Email;
  }

  try {
    const updatedBill = await res.bill.save();
    res.json(updatedBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa một hóa đơn
router.delete('/:id', getBill, async (req, res) => {
  try {
    await res.bill.remove();
    res.json({ message: 'Bill đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy thông tin của một hóa đơn dựa trên ID
async function getBill(req, res, next) {
  try {
    const bill = await Bill.findById(req.params.id);
    if (bill == null) {
      return res.status(404).json({ message: 'Không tìm thấy hóa đơn' });
    }
    res.bill = bill;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;