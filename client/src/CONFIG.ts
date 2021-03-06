export default {
    DEV: {
        API: {
            BASE_URL: 'http://localhost:3030/',
            USER : {
                SIGN_IN: 'user/signin',
                GET_USER: 'user/get',
                SIGN_UP: 'user/signup'
            },
            CARD: {
                ADD_CARD: 'user/card/addcard',
                DELETE_CARD: 'user/card/deletecard',
                SET_DEFAULT: 'user/card/setdefault'
            },
            SUBSCRIPTION: {
                INIT: 'user/subscription/init',
                SUSPEND: 'user/subscription/suspend',
            },
            PLAN: {
                GET_ALL: 'plan/getall'
            }
        },
        STRIPE : {
            PUBLISHABLE_KEY: 'pk_test_zkj5F5bIbvlv03duhndT1amC'
        }
    }

}