import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserPermission } from 'src/app/misc/permissions.service';
import { Path } from 'src/app/models/path.model';
import { PathService } from 'src/app/services/path.service';
import { UserStorageService } from 'src/app/services/user_storage.service';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss']
})
export class PathsComponent implements OnInit {

  paths: Array<Path> = [];
  isAdmin = false;

  constructor(private pathSrv: PathService, private userStorageSrv: UserStorageService, private route: Router,
    public dialog: MatDialog, private userPermission: UserPermission) { }

  ngOnInit(): void {
    this.isAdmin = this.userPermission.isAdmin();
    this.getPaths();
  }

  getPaths() {
    this.pathSrv.getPaths().then((res) => {
      console.log(res.body);
      if (res && res.body) {
        this.paths = res.body;
        console.log(this.paths);
      }
    });
  }

  goToPathDetail(id: any) {
    this.route.navigateByUrl('/pathDetail/' + id);
  }

  goToNewPath() {
    this.route.navigateByUrl('/newPath');
  }

}
