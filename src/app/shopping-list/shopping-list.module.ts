import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  exports: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
  ],
})
export class ShoppingListModule {}
