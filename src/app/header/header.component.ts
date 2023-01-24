import { AuthService } from './../auth.service';
import { StorageService } from './../storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public storageService: StorageService) { }

  ngOnInit(): void {
  }

  isGuestLogged() {
    return this.storageService.isAuthenticated();
  }

  loginGuest() {
    this.authService.loginGuest().subscribe(() => {
    })
  }

  logoutGuest() {
    this.storageService.removeFromStorage("guest_token")
  }

}
