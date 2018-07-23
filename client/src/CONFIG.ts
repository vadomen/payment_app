export default {
    DEV: {
        API: {
            BASE_URL: 'http://localhost:3030/',
            USER : {
                SIGN_IN: 'user/signin',
                GET_USER: 'user/get',
                SIGN_UP: 'user/signup'
            },
            PAYMENT: {
                ADD_CARD: 'user/payment/addcard',
                DELETE_CARD: 'user/payment/deletecard'
            },
            SUBSCRIPTION: {
                INIT: 'user/subscription/init',
                SUSPEND: 'user/subscription/suspend',
            }
        },
        STRIPE : {
            PUBLISHABLE_KEY: 'pk_test_zkj5F5bIbvlv03duhndT1amC'
        }
    }

}