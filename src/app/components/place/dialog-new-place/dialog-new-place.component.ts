import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MapService } from 'src/app/services/nominatim.service';
import { PlaceService } from 'src/app/services/place.service';
import { UserStorageService } from 'src/app/services/user_storage.service';

@Component({
  selector: 'app-dialog-new-place',
  templateUrl: './dialog-new-place.component.html',
  styleUrls: ['./dialog-new-place.component.scss']
})
export class DialogNewPlaceComponent implements OnInit {

  placeForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogNewPlaceComponent>, private fb: FormBuilder,
    private placeSrv: PlaceService, private userStorageSrv: UserStorageService, private mapSrv: MapService,
    private errorSrv: ToastrService ) {

    this.placeForm = this.fb.group({
      name: [, Validators.required],
      nation: [, Validators.required],
      province: [, Validators.required],
      city: [, Validators.required],
      address: [, Validators.required],
      region: [, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

  addPlace() {
    if (this.placeForm.invalid) {
      Object.keys(this.placeForm.controls).forEach(field => {
        const control = this.placeForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
      return;
    }

    let obj = {
      province: this.placeForm.controls['province'].value,
      nation: this.placeForm.controls['nation'].value,
      city: this.placeForm.controls['city'].value,
      address: this.placeForm.controls['address'].value,
    }

    this.mapSrv.getLatLong(obj).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          let lat = response[0].lat;
          let long = response[0].lon;
          console.log("lat " + lat + " long " + long);
          this.savePlace(lat, long);
        } else {
          this.errorSrv.error("Si è verificato un errore. Devi inserire un indirizzo valido");
        }
      });



  }

  savePlace(lat: any, long: any) {
    var token = this.userStorageSrv.getToken();

    let obj = {
      name: this.placeForm.controls['name'].value,
      nation: this.placeForm.controls['nation'].value,
      province: this.placeForm.controls['province'].value,
      city: this.placeForm.controls['city'].value,
      address: this.placeForm.controls['address'].value,
      region: this.placeForm.controls['region'].value,
      latitude: lat,
      longitude: long,
    }

    this.placeSrv.savePlace(obj, token).then((res) => {
      console.log(res);
      this.close();
    });
  }
}
