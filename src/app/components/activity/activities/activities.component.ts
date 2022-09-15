import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserPermission } from 'src/app/misc/permissions.service';
import { Activity } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Array<Activity> = [];
  isAdmin = false;
  photo = "https://www.vallesturaoutdoor.com/wp-content/uploads/2020/11/Mattia1.jpg"

  constructor(private activitySrv: ActivityService, private userPermission: UserPermission, private route: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.userPermission.isAdmin();
    this.getActivities();
  }

  getActivities() {
    this.activitySrv.getActivities().then((res) => {
      console.log(res.body);
      if (res && res.body) {
        this.activities = res.body;
      }
    });
  }

  goToNewActivity() {
    this.route.navigateByUrl('/newActivity');
  }
  
  goToActivityDetail(id: any) {
    this.route.navigateByUrl('/activityDetail/' + id);
  }

}
