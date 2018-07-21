
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CardEditorComponent } from './card-editor/card-editor.component';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    ConfirmationComponent,
    CardEditorComponent,
    ModalWrapperComponent,
    SignupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalWrapperComponent
  ]
})
export class ModalsModules {}