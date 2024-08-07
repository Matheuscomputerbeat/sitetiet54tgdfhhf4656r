const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/aliexpress', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const saleSchema = new mongoose.Schema({
    productId: String,
    date: { type: Date, default: Date.now },
    userId: String,
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = { Sale };
