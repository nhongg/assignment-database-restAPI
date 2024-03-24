const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const categoryRoute = require('./routes/categoryRoutes');
const productRoute = require('./routes/productRoutes');
const billRoute = require('./routes/billRoutes');
const billdetailRoute = require('./routes/billdetailsRoutes');
const accountRoute = require('./routes/accountRoutes');

const app = express();

mongoose.connect('mongodb+srv://anhntkph42900:1234566@cluster0.tfolv4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Kết nối thành công với server MongoDB");
}).catch((err) => {
  console.error(err);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');


app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/bill', billRoute);
app.use('/billdetail', billdetailRoute);
app.use('/account', accountRoute);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server đang chạy trên cổng " + PORT);
});