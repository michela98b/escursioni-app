import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { GenericGateService } from './services/generic_gate.service';
import { PlaceService } from './services/place.service';
import { AuthService } from './services/auth.service';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from 'src/material-module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service';
import { UserStorageService } from './services/user_storage.service';
import { NavbarComponent } from './utility/navbar/navbar.component';
import { PlacesComponent } from './components/place/places/places.component';
import { PathsComponent } from './components/path/paths/paths.component';
import { PathService } from './services/path.service';
import { ActivityService } from './services/activity.service';
import { PathCardComponent } from './utility/path-card/path-card.component';
import { PathDetailComponent } from './components/path/path-detail/path-detail.component';
import { PathCreatePageComponent } from './components/path/path-create-page/path-create-page.component';
import { DialogNewPlaceComponent } from './components/place/dialog-new-place/dialog-new-place.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapService } from './services/nominatim.service';
import { MapComponent } from './utility/map/map.component';
import { UserPermission } from './misc/permissions.service';
import { ActivitiesComponent } from './components/activity/activities/activities.component';
import { ActivityCreatePageComponent } from './components/activity/activity-create-page/activity-create-page.component';
import { ActivityDetailComponent } from './components/activity/activity-detail/activity-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AlertDialogComponent } from './utility/alert-dialog/alert-dialog.component';
import { ItineraryService } from './services/itinerary.service';
import { DialogItineraryComponent } from './components/itinerary/dialog-itinerary/dialog-itinerary.component';
import { DialogNewItineraryComponent } from './components/itinerary/dialog-new-itinerary/dialog-new-itinerary.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { loader_exclude_list } from './exclude_list';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#45523e',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.ballScaleMultiple, // background spinner type
  fgsColor: '#45523e',
  fgsType: SPINNER.ballScaleMultiple, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 3, // progress bar thickness
  pbColor: '#45523e',
  overlayColor: '#ffffff',
  logoUrl:'assets/images/logogreen-nobkg.png',
  logoSize:200,
  logoPosition:'center-center'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    PlacesComponent,
    PathsComponent,
    PathCardComponent,
    PathDetailComponent,
    PathCreatePageComponent,
    DialogNewPlaceComponent,
    MapComponent,
    ActivitiesComponent,
    ActivityCreatePageComponent,
    ActivityDetailComponent,
    UserProfileComponent,
    AlertDialogComponent,
    DialogItineraryComponent,
    DialogNewItineraryComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    TranslateModule.forRoot(
      {
        defaultLanguage: 'it',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }
    ),
    GoogleMapsModule,
    HttpClientJsonpModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-center',
      progressBar:true
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true, exclude: loader_exclude_list }),
  ],
  providers: [
    TranslateService,
    GenericGateService,
    PlaceService,
    AuthService,
    StorageService,
    UserStorageService,
    PathService,
    ActivityService,
    MapService,
    UserPermission,
    ItineraryService,
  ],
  exports: [
    NavbarComponent,
    PathCardComponent,
    DialogNewPlaceComponent,
    MapComponent,
    AlertDialogComponent,
    DialogNewItineraryComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
