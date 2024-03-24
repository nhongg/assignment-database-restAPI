const express = require('express');
const router = express.Router();
const BillDetail = require('../models/billdetailsModels');

// Lấy tất cả các chi tiết hóa đơn
router.get('/', async (req, res) => {
  try {
    const billDetails = await BillDetail.find();
    res.json(billDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo một chi tiết hóa đơn mới
router.post('/', async (req, res) => {
  const { BIIIID, ProductID, Quantity } = req.body;

  try {
    const billDetail = new BillDetail({
      BIIIID: BIIIID,
      ProductID: ProductID,
      Quantity: Quantity
    });

    const newBillDetail = await billDetail.save();
    res.status(201).json(newBillDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Lấy thông tin của một chi tiết hóa đơn cụ thể
router.get('/:id', getBillDetail, (req, res) => {
  res.json(res.billDetail);
});

// Cập nhật thông tin của một chi tiết hóa đơn
router.patch('/:id', getBillDetail, async (req, res) => {
  const { quantity } = req.body;

  if (quantity != null) {
    res.billDetail.Quantity = quantity;
  }

  try {
    const updatedBillDetail = await res.billDetail.save();
    res.json(updatedBillDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa một chi tiết hóa đơn
router.delete('/:id', getBillDetail, async (req, res) => {
  try {
    await res.billDetail.remove();
    res.json({ message: 'Bill detail đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy thông tin của một chi tiết hóa đơn dựa trên ID
async function getBillDetail(req, res, next) {
  try {
    const billDetail = await BillDetail.findById(req.params.id);
    if (billDetail == null) {
      return res.status(404).json({ message: 'Không tìm thấy chi tiết hóa đơn' });
    }
    res.billDetail = billDetail;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;