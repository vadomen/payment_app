import CONFIG from '../CONFIG';

export const environment = {
  production: true,
  API : CONFIG.DEV.API,
  STRIPE : CONFIG.DEV.STRIPE
};
