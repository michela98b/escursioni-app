import { Injectable } from "@angular/core";
import { GenericGateService } from "./generic_gate.service";

@Injectable()
export class PathService {

    constructor(private genericHttpService: GenericGateService) { }

    public getPaths(): Promise<any> {
        return this.genericHttpService.doHttpRequest('GET', '/path/all');
    }

    public getPath(path_id: string): Promise<any> {
        return this.genericHttpService.doHttpRequest('GET', '/path/' + path_id);
    }

    public savePath(obj: Object | undefined, token: String): Promise<any> {
        return this.genericHttpService.doHttpRequest('POST', '/admin/path/add', obj, [{ key: "Authorization", value: "Bearer " + token }]);
    }

}