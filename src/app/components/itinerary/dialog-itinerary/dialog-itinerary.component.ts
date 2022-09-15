import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Path } from 'src/app/models/path.model';
import { AuthService } from 'src/app/services/auth.service';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { UserStorageService } from 'src/app/services/user_storage.service';

@Component({
  selector: 'app-dialog-itinerary',
  templateUrl: './dialog-itinerary.component.html',
  styleUrls: ['./dialog-itinerary.component.scss']
})
export class DialogItineraryComponent implements OnInit {

  itinerary: any;
  path: Path | undefined;
  itineraries: any = [];

  constructor(public dialogRef: MatDialogRef<DialogItineraryComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private authSrv: AuthService, private userStorageSrv: UserStorageService, private itinerarySrv: ItineraryService) { }

  ngOnInit(): void {
    this.path = this.data.path;
    this.getUser();
  }

  getUser() {
    this.authSrv.getUser(this.userStorageSrv.getUser().id).then((res) => {
      this.itineraries = res.body.itineraries;
    });
  }

  close() {
    this.dialogRef.close()
  }

  addPath() {
    if (this.itinerary) {
      this.itinerarySrv.addPath(this.itinerary, this.path, this.userStorageSrv.getToken()).then((res) => {
        this.close();
      });
    }
  }

}
