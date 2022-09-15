import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './components/activity/activities/activities.component';
import { ActivityCreatePageComponent } from './components/activity/activity-create-page/activity-create-page.component';
import { ActivityDetailComponent } from './components/activity/activity-detail/activity-detail.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PathCreatePageComponent } from './components/path/path-create-page/path-create-page.component';
import { PathDetailComponent } from './components/path/path-detail/path-detail.component';
import { PathsComponent } from './components/path/paths/paths.component';
import { PlacesComponent } from './components/place/places/places.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'paths', component: PathsComponent },
  { path: 'pathDetail/:id', component: PathDetailComponent },
  { path: 'newPath', component: PathCreatePageComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'newActivity', component: ActivityCreatePageComponent },
  { path: 'activityDetail/:id', component: ActivityDetailComponent },
  { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
