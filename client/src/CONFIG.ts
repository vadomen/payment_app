export default {
    DEV: {
        API: {
            BASE_URL: 'http://localhost:3030/',
            USER : {
                SIGN_IN: 'user/signin',
                GET_USER: 'user/get'
            },
            PAYMENT: {
                ADD_CARD: 'user/payment/addcard',
                UPDATE_CARD: 'user/payment/updatecard',
                DELETE_CARD: 'user/payment/deletecard'
            }
        },
        STRIPE : {
            PUBLISHABLE_KEY: 'pk_test_zkj5F5bIbvlv03duhndT1amC'
        }
    }

}