import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPermission } from 'src/app/misc/permissions.service';
import { UserStorageService } from 'src/app/services/user_storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAdmin = false;
  user:any;

  constructor(private route: Router, private userPermission: UserPermission, private userStorageSrv: UserStorageService,) { }

  ngOnInit(): void {
    this.isAdmin = this.userPermission.isAdmin();
    this.user = this.userStorageSrv.getUser();
  }

  goToPlaces() {
    this.route.navigateByUrl("/places")
  }

  goToPaths() {
    this.route.navigateByUrl("/paths")
  }

  goToActivities() {
    this.route.navigateByUrl("/activities")
  }

  goToHome() {
    this.route.navigateByUrl("/home")
  }

  logout() {
    this.userStorageSrv.logout();
    this.route.navigateByUrl("/login");
  }

}
