import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserPermission } from 'src/app/misc/permissions.service';
import { AuthService } from 'src/app/services/auth.service';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { UserStorageService } from 'src/app/services/user_storage.service';
import { DialogNewItineraryComponent } from '../itinerary/dialog-new-itinerary/dialog-new-itinerary.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  itineraries: any = [];

  isAdmin = false;

  constructor(private userStorageSrv: UserStorageService, private authSrv: AuthService,
    public dialog: MatDialog, private userPermission: UserPermission, private route: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.userPermission.isAdmin();
    this.user = this.userStorageSrv.getUser();
    this.getUser();
  }

  openAddItineraryDialog() {
    const dialogRef = this.dialog.open(DialogNewItineraryComponent, {
      width: '430px',
      data: { user: this.user }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getUser();
    });
  }

  getUser() {
    this.authSrv.getUser(this.user.id).then((res) => {
      if (!this.isAdmin) {
        this.itineraries = res.body.itineraries
      }
    });
  }

  goToPath(id:any){
    this.route.navigateByUrl('/pathDetail/' + id);
  }

}
