import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faAt, faSignOutAlt, faEraser, faUserCircle, 
        faCreditCard, faPlus, faMoneyBillAlt, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
// import {  } from '@fortawesome/free-regular-svg-icons';

library.add(faTrash, faAt, faCcVisa, faCcMastercard, 
            faSignOutAlt, faEraser, faUserCircle, 
            faCreditCard, faPlus, faMoneyBillAlt,
            faFileInvoiceDollar);

@NgModule({
  exports: [
      FontAwesomeModule
  ]
})
export class IconModule { }