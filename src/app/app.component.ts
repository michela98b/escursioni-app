import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from './services/auth.service';
import { PlaceService } from './services/place.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public currentLocationState = "";
  title = 'escursioni-app';

  constructor(private router: Router, private ngxService: NgxUiLoaderService,) {

    this.ngxService.start();

    setTimeout(() => {
      this.ngxService.stop();
    }, 1000);

    this.router.events.subscribe((val) => {
      this._navigationInterceptor(val);
    })
  }

  private _navigationInterceptor(event: any) {
    if (event instanceof NavigationEnd) {
      let state = event.urlAfterRedirects || (event.url === "/" ? "/login" : event.url);
      this.currentLocationState = state.indexOf(';') !== -1 ? state.substr(0, state.indexOf(';')) : state;
    }
  }

}
