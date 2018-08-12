const userRoutes = require('./user.routes');
const cardRoutes = require('./card.routes');
const subscriptionRoutes = require('./subscription.routes');
const planRoutes = require('./plan.routes');

module.exports = Object.assign({}, userRoutes, cardRoutes, subscriptionRoutes, planRoutes);
