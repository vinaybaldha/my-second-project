import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDown]',
})
export class dropDownDirective {
  @HostBinding('class.open') onClick = false;
  @HostListener('click') toggleDown() {
    this.onClick = !this.onClick;
  }
}
