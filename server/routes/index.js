const userRoutes = require('./userRoutes');
const cardRoutes = require('./cardRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');

module.exports = Object.assign({}, userRoutes, cardRoutes, subscriptionRoutes);
