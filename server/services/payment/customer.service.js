const { Customer } = require('./wrappers/payment.wrapper');

const CustomerService = {
    createCustomer (email) {
        return Customer.createCustomer(email);
    },

    getCustomerById (id) {
        return Customer.getCustomerById(id);
    }
}

module.exports = CustomerService;
