import { Component, OnInit } from '@angular/core';
import { UserPermission } from 'src/app/misc/permissions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAdmin = false;

  constructor(private userPermission: UserPermission) { }

  ngOnInit(): void {
    this.isAdmin = this.userPermission.isAdmin();
  }

}
