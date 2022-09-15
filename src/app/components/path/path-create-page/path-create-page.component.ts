import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Place } from 'src/app/models/place.model';
import { PathService } from 'src/app/services/path.service';
import { PlaceService } from 'src/app/services/place.service';
import { UserStorageService } from 'src/app/services/user_storage.service';

@Component({
  selector: 'app-path-create-page',
  templateUrl: './path-create-page.component.html',
  styleUrls: ['./path-create-page.component.scss']
})
export class PathCreatePageComponent implements OnInit {

  pathForm: FormGroup;
  places:Array<Place>  = []

  difficulties: Array<string> = ["F-facile", "M-Intermedio", "D-Difficile", "E-Esperto"];

  constructor(private pathSrv: PathService, private userStorageSrv: UserStorageService, private fb:FormBuilder,
    private placeSrv:PlaceService, private route:Router) {

    this.pathForm = this.fb.group({
      name: [, Validators.required],
      description: [, Validators.required],
      duration: [, Validators.required],
      difficulty: [, Validators.required],
      start:[, Validators.required],
      height: []
    });
   }

  ngOnInit(): void {
    this.getPlaces();
  }

  getPlaces(){
    this.placeSrv.getPlaces().then((res)=>{
        if(res && res.body){
          this.places = res.body
        }
    });
  }

  addPath() {
    if (this.pathForm.invalid) {
      Object.keys(this.pathForm.controls).forEach(field => {
        const control = this.pathForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.saveNewPath();
  }

  saveNewPath(){
    var token = this.userStorageSrv.getToken();

    let obj = {
      name: this.pathForm.controls['name'].value,
      description: this.pathForm.controls['description'].value,
      difficulty: this.pathForm.controls['difficulty'].value,
      duration: this.pathForm.controls['duration'].value,
      start:this.pathForm.controls['start'].value,
      height:this.pathForm.controls['height'].value,
    }

    this.pathSrv.savePath(obj, token).then((res) => {
      this.route.navigateByUrl("/paths")
    });
  }

}
