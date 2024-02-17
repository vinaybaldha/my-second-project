import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}
  @Output() selectMenu = new EventEmitter<string>();

  onClick(name: string) {
    this.selectMenu.emit(name);
  }
  onSave() {
    this.dataStorageService.saveData();
  }
  onFatch() {
    this.dataStorageService.fatchData().subscribe();
  }
}
