const express = require('express');
const router = express.Router();
const Account = require('../models/accountModels');

// Lấy tất cả các tài khoản
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo một tài khoản mới
router.post('/', async (req, res) => {
  const { Email, Password, FullName } = req.body;

  try {
    const account = new Account({
      Email,
      Password,
      FullName
    });

    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Lấy thông tin của một tài khoản cụ thể
router.get('/:email', getAccount, (req, res) => {
  res.json(res.account);
});

// Cập nhật thông tin của một tài khoản
router.patch('/:email', getAccount, async (req, res) => {
  const { password, fullName } = req.body;

  if (password != null) {
    res.account.password = password;
  }
  if (fullName != null) {
    res.account.fullName = fullName;
  }

  try {
    const updatedAccount = await res.account.save();
    res.json(updatedAccount);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa một tài khoản
router.delete('/:email', getAccount, async (req, res) => {
  try {
    await res.account.remove();
    res.json({ message: 'Account đã xóa' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//để lấy thông tin của một tài khoản dựa trên Email
async function getAccount(req, res, next) {
  try {
    const account = await Account.findOne({ email: req.params.email });
    if (account == null) {
      return res.status(404).json({ message: 'Account không có' });
    }
    res.account = account;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;