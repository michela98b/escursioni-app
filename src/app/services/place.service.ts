import { Injectable } from "@angular/core";
import { GenericGateService } from "./generic_gate.service";

@Injectable()
export class PlaceService {

    constructor(private genericHttpService: GenericGateService) { }

    public getPlaces(): Promise<any> {
        return this.genericHttpService.doHttpRequest('GET',  '/place/all');
    }

    public savePlace(obj: Object | undefined, token:String): Promise<any> {
        return this.genericHttpService.doHttpRequest('POST',  '/admin/place/add', obj, [{key:"Authorization", value:"Bearer "+token}]);
    }

}