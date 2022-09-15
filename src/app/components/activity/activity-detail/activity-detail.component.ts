import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserPermission } from 'src/app/misc/permissions.service';
import { Activity } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity.service';
import { AlertDialogComponent } from 'src/app/utility/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  activity: Activity | undefined;
  center: any;
  markers: any = [];

  isAdmin = false;

  constructor(private route: ActivatedRoute, private activitySrv: ActivityService, public dialog: MatDialog,
    private router: Router, private userPermission: UserPermission) { }

  ngOnInit(): void {
    this.isAdmin = this.userPermission.isAdmin();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id')
      this.getActivity(id);
    })
  }
  
  getActivity(id: any) {
    this.activitySrv.getActivity(id!).then((res) => {
      this.activity = res.body;

      let lat = parseFloat(this.activity!.place.latitude);
      let long = parseFloat(this.activity!.place.longitude);
      this.center = {
        lat: lat,
        lng: long,
      }
      this.markers.push(this.activity!.place)
    });
  }

  deleteActivity() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '430px',
      data: { title: "Elimina attività", description: "Sei sicuro di voler eliminare l'attività " + this.activity?.name + "? L'azione è irreversibile.", isMultiple:true }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == true) {
        this.activitySrv.deleteActivity(this.activity!.id.toString()).then((res) => {
          this.router.navigateByUrl('/activities');
        });
      }
    });
  }

  goToEdit() {
    this.router.navigate(['/newActivity'], { state: { id: this.activity?.id } });
  }
}
