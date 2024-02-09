import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() selectMenu = new EventEmitter<string>();

  onClick(name: string) {
    this.selectMenu.emit(name);
  }
}
