import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { UserStorageService } from 'src/app/services/user_storage.service';

@Component({
  selector: 'app-dialog-new-itinerary',
  templateUrl: './dialog-new-itinerary.component.html',
  styleUrls: ['./dialog-new-itinerary.component.scss']
})
export class DialogNewItineraryComponent implements OnInit {

  user: any;
  itineraryForm: FormGroup;

  constructor(private itinerarySrv: ItineraryService, private userStorageSrv: UserStorageService,
    public dialogRef: MatDialogRef<DialogNewItineraryComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {

    this.itineraryForm = this.fb.group({
      name: [, Validators.required],
      description: [, Validators.required],
    });

  }

  ngOnInit(): void {
    this.user = this.data.user;
  }

  addItinerary() {
    if (this.itineraryForm.invalid) {
      Object.keys(this.itineraryForm.controls).forEach(field => {
        const control = this.itineraryForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
      return;
    }

    let traveler = {
      name: this.user.name,
      surname: this.user.surname,
      id: this.user.id,
    }

    let obj = {
      name:  this.itineraryForm.controls['name'].value,
      description:  this.itineraryForm.controls['description'].value,
      traveler: traveler,
      paths: [],
    }

    this.itinerarySrv.saveItinerary(obj, this.userStorageSrv.getToken()).then((res) => {
      this.close();
    });
  }

  close() {
    this.dialogRef.close()
  }

}
