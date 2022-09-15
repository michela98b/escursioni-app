import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserPermission } from 'src/app/misc/permissions.service';
import { Path } from 'src/app/models/path.model';
import { PathService } from 'src/app/services/path.service';
import { DialogItineraryComponent } from '../../itinerary/dialog-itinerary/dialog-itinerary.component';

@Component({
  selector: 'app-path-detail',
  templateUrl: './path-detail.component.html',
  styleUrls: ['./path-detail.component.scss']
})
export class PathDetailComponent implements OnInit {

  path: Path | undefined;
  center: any;
  markers: any = [];

  isAdmin = false;

  constructor(private route: ActivatedRoute, private pathSrv: PathService, private userPermission: UserPermission,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isAdmin = this.userPermission.isAdmin();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id')
      this.getPath(id);
    })
  }

  getPath(id: any) {
    this.pathSrv.getPath(id!).then((res) => {
      this.path = res.body;

      let lat = parseFloat(this.path!.start.latitude);
      let long = parseFloat(this.path!.start.longitude);
      this.center = {
        lat: lat,
        lng: long,
      }
      this.markers.push(this.path!.start)
    });
  }

  addToItinerary(){
    const dialogRef = this.dialog.open(DialogItineraryComponent, {
      width: '430px',
      data: { path:this.path }
    });
  }

}
