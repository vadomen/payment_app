import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faSignOutAlt, faEraser,
        faPlus, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard } from '@fortawesome/free-brands-svg-icons';
// import {  } from '@fortawesome/free-regular-svg-icons';

library.add(faTrash, faCcVisa, faCcMastercard,
            faSignOutAlt, faEraser, faPlus, faStopCircle);

@NgModule({
    exports: [
        FontAwesomeModule
    ]
})
export class IconModule { }