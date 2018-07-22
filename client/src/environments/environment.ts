import CONFIG from '../CONFIG';

export const environment = {
    production: false,
    API : CONFIG.DEV.API,
    STRIPE : CONFIG.DEV.STRIPE
};

