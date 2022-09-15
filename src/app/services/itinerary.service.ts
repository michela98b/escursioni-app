import { Injectable } from "@angular/core";
import { GenericGateService } from "./generic_gate.service";

@Injectable()
export class ItineraryService {

    constructor(private genericHttpService: GenericGateService) { }

    public saveItinerary(obj: Object | undefined, token:String): Promise<any> {
        return this.genericHttpService.doHttpRequest('POST',  '/itinerary/add', obj, [{key:"Authorization", value:"Bearer "+token}]);
    }

    public addPath(itinerary_id:string,obj: Object | undefined, token: String): Promise<any> {
        return this.genericHttpService.doHttpRequest('POST', '/itinerary/add/'+itinerary_id, obj, [{ key: "Authorization", value: "Bearer " + token }]);
    }

}