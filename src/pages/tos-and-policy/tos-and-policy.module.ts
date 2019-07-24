import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TosAndPolicyPage } from './tos-and-policy';

@NgModule({
  declarations: [
    TosAndPolicyPage,
  ],
  imports: [
    IonicPageModule.forChild(TosAndPolicyPage),
  ],
})
export class TosAndPolicyPageModule {}
