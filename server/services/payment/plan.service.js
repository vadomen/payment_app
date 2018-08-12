const { Plan } = require('./wrappers/payment.wrapper');

const PlanService = {
    getAllPlans () {
        return Plan.getAllPlans();
    }
}

module.exports = PlanService;