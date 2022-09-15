import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { Place } from 'src/app/models/place.model';
import { ActivityService } from 'src/app/services/activity.service';
import { PlaceService } from 'src/app/services/place.service';
import { UserStorageService } from 'src/app/services/user_storage.service';

@Component({
  selector: 'app-activity-create-page',
  templateUrl: './activity-create-page.component.html',
  styleUrls: ['./activity-create-page.component.scss']
})
export class ActivityCreatePageComponent implements OnInit {

  activityForm: FormGroup;
  places: Array<Place> = []

  activity: Activity | undefined;
  id:any;
  isEdit = false;

  difficulties: Array<string> = ["F-facile", "M-Intermedio", "D-Difficile", "E-Esperto"];

  constructor(private activitySrv: ActivityService, private userStorageSrv: UserStorageService, private fb: FormBuilder,
    private placeSrv: PlaceService, private router: Router, private route: ActivatedRoute,) {

    this.activityForm = this.fb.group({
      name: [, Validators.required],
      description: [, Validators.required],
      duration: [, Validators.required],
      difficulty: [, Validators.required],
      price: [, Validators.required],
      peoples: [, Validators.required],
      place: [, Validators.required],
    });

    if (this.router.getCurrentNavigation()?.extras?.state?.['id']) {
      let id = this.router.getCurrentNavigation()?.extras?.state?.['id'];
      if (id) {
       this.id = id;
       this.isEdit = true;
       this.userStorageSrv.setCurrentActivity(id);
      }
    }
    if(this.userStorageSrv.getCurrentActivity()){
      this.id = this.userStorageSrv.getCurrentActivity();
      this.isEdit = true;
    }
  }

  ngOnInit(): void {
    this.getPlaces();
    if(this.isEdit){
      this.getActivity();
    }
  }

  getActivity() {
    this.activitySrv.getActivity(this.id!).then((res) => {
      this.activity = res.body;
      this.setForm();
    });
  }

  setForm() {
    this.activityForm.get('name')!.setValue(this.activity!.name);
    this.activityForm.get('description')!.setValue(this.activity!.description);
    this.activityForm.get('duration')!.setValue(this.activity!.duration);
    this.activityForm.get('difficulty')!.setValue(this.activity!.difficulty);
    this.activityForm.get('price')!.setValue(this.activity!.price);
    this.activityForm.get('peoples')!.setValue(this.activity!.peoples);
    this.activityForm.get('place')!.setValue(this.activity!.place);
  }

  getPlaces() {
    this.placeSrv.getPlaces().then((res) => {
      if (res && res.body) {
        this.places = res.body
      }
    });
  }

  addActivity() {
    if (this.activityForm.invalid) {
      Object.keys(this.activityForm.controls).forEach(field => {
        const control = this.activityForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
      return;
    }

    if (this.isEdit) {
      this.editActivity();
    } else {
      this.saveNewActivity();
    }
  }

  saveNewActivity() {

    let obj = {
      name: this.activityForm.controls['name'].value,
      description: this.activityForm.controls['description'].value,
      difficulty: this.activityForm.controls['difficulty'].value,
      duration: this.activityForm.controls['duration'].value,
      place: this.activityForm.controls['place'].value,
      price: this.activityForm.controls['price'].value,
      peoples: this.activityForm.controls['peoples'].value,
    }


    var token = this.userStorageSrv.getToken();
    this.activitySrv.saveActivity(obj, token).then((res) => {
      this.router.navigateByUrl("/activities")
    });
  }

  editActivity() {
    let obj = {
      name: this.activityForm.controls['name'].value,
      description: this.activityForm.controls['description'].value,
      difficulty: this.activityForm.controls['difficulty'].value,
      duration: this.activityForm.controls['duration'].value,
      place: this.activityForm.controls['place'].value,
      price: this.activityForm.controls['price'].value,
      peoples: this.activityForm.controls['peoples'].value,
      id: this.activity?.id,
    }

    var token = this.userStorageSrv.getToken();
    this.activitySrv.saveActivity(obj, token).then((res) => {
      this.userStorageSrv.setCurrentActivity(null);
      this.router.navigateByUrl("/activities")
    });
  }

}
