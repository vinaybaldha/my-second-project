import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  @ViewChild('inputName') nameRef: ElementRef;
  @ViewChild('inputAmount') amountRef: ElementRef;

  constructor() {
    this.nameRef = {} as ElementRef;
    this.amountRef = {} as ElementRef;
  }
  @Output() data = new EventEmitter<Ingredient>();
  onAdd() {
    const name = this.nameRef.nativeElement.value;
    const amount = this.amountRef.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.data.emit(ingredient);
  }
}
