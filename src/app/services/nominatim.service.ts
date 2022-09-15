import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MapService {

    constructor(private http: HttpClient) { }

    public getLatLong(dataParam: any) {
        return this.http.get('https://nominatim.openstreetmap.org/?street=' + dataParam.address + '&format=json&limit=1&province=' + dataParam.province + '&city=' + dataParam.city + '&country=' + dataParam.nation);
    }

}