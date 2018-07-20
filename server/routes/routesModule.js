const userRoutes = require('./userRoutes');
const paymentRoutes = require('./paymentRoutes');

module.exports = Object.assign({}, userRoutes, paymentRoutes);