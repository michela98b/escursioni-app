import { Injectable } from "@angular/core";
import { GenericGateService } from "./generic_gate.service";

@Injectable()
export class ActivityService {

    constructor(private genericHttpService: GenericGateService) { }

    public getActivities(): Promise<any> {
        return this.genericHttpService.doHttpRequest('GET',  '/activity/all');
    }

    public getActivity(activity_id: string): Promise<any> {
        return this.genericHttpService.doHttpRequest('GET', '/activity/' + activity_id);
    }

    public saveActivity(obj: Object | undefined, token:String): Promise<any> {
        return this.genericHttpService.doHttpRequest('POST',  '/admin/activity/add', obj, [{key:"Authorization", value:"Bearer "+token}]);
    }

    public deleteActivity(activity_id: string): Promise<any> {
        return this.genericHttpService.doHttpRequest('GET', '/admin/activity/delete/' + activity_id);
    }

}