import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopinglist.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @ViewChild('inputName') nameRef: ElementRef;
  @ViewChild('inputAmount') amountRef: ElementRef;

  constructor(private slService: ShoppingListService) {
    this.nameRef = {} as ElementRef;
    this.amountRef = {} as ElementRef;
  }

  onAdd() {
    const name = this.nameRef.nativeElement.value;
    const amount = this.amountRef.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.slService.addIngredient(ingredient);
  }
}
