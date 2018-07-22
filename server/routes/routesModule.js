const userRoutes = require('./userRoutes');
const paymentRoutes = require('./paymentRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');

module.exports = Object.assign({}, userRoutes, paymentRoutes, subscriptionRoutes);