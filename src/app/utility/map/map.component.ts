import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { catchError, map, Observable, of } from 'rxjs';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  apiLoaded: Observable<boolean>;

  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;
  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMap;
  center!: google.maps.LatLngLiteral;

  markers = [] as any;
  infoContent = ''
  zoom = 8;
  mapHieght = "350px";

  @Input() currentCenter: any;
  @Input() height: any;
  @Input() mapMarkers: any = [];


  icon = {
    url: 'https://cdn2.iconfinder.com/data/icons/camping-trekking-1/614/2721_-_Trekking-512.png', // url
    scaledSize: new google.maps.Size(30, 30), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };

  constructor(private httpClient: HttpClient) {
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyD6BVPRQXfAt6CFj-LGYavmGzo6afnj8ro', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
    console.log(this.currentCenter);
    console.log(this.mapMarkers);
    this.mapHieght = this.height;
    if (this.currentCenter) {
      this.center = {
        lat: this.currentCenter.lat,
        lng: this.currentCenter.lng,
      }
    }

    if (this.mapMarkers && this.mapMarkers.length > 0) {
      this.mapMarkers.forEach((m: any) => {
        this.dropMarker(m);
      });
    }
  }


  dropMarker(place: Place) {

    this.markers.push({
      position: {
        lat: parseFloat(place.latitude),
        lng: parseFloat(place.longitude),
      },
      title: place.name,
      info: place.address + ", " + place.city + ", " + place.province + ", " + place.nation,
      options: {
        animation: google.maps.Animation.DROP,
        icon: this.icon
      },
    })
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.info.open(marker)
  }

  getUrl(info: any) {
    return "https://maps.google.com/?q=" + info;
  }

}
