import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { dropDownDirective } from './dropDown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AlertComponent, LoadingSpinnerComponent, dropDownDirective],
  imports: [CommonModule],
  exports: [AlertComponent, LoadingSpinnerComponent, dropDownDirective],
})
export class SharedModule {}
