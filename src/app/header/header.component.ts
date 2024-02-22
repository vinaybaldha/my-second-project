import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated!: boolean;
  userAuth!: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userAuth = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

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
  ngOnDestroy(): void {
    this.userAuth.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
