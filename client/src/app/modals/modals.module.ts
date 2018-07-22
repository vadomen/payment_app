
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CardEditorComponent } from './card-editor/card-editor.component';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { SignupComponent } from './signup/signup.component';
import { CardCreatorComponent } from './card-creator/card-creator.component';


@NgModule({
  declarations: [
    ConfirmationComponent,
    CardEditorComponent,
    ModalWrapperComponent,
    SignupComponent,
    CardCreatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalWrapperComponent
  ]
})
export class ModalsModules {}