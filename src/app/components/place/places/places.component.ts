import { Component, OnInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewPlaceComponent } from 'src/app/components/place/dialog-new-place/dialog-new-place.component';
import { Place } from 'src/app/models/place.model';
import { PlaceService } from 'src/app/services/place.service';
import { UserStorageService } from 'src/app/services/user_storage.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  places: Array<Place> = [];
  markers: any = [];
  center:any;

  loaded = false;

  constructor(private placeSrv: PlaceService, private userStorageSrv: UserStorageService, public dialog: MatDialog,) { 
  }

  ngOnInit(): void {
    this.getPlaces();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  getPlaces() {
    this.placeSrv.getPlaces().then((res) => {
      this.places = res.body;
      this.markers = this.places;
      console.log(this.markers)
      console.log(this.center);
      this.loaded = true;
    });
  }

  openAddPlaceDialog() {
    const dialogRef = this.dialog.open(DialogNewPlaceComponent, {
      width: '430px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPlaces();
    });
  }
}
