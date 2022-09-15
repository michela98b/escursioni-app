import { Injectable } from "@angular/core";
import { GenericGateService } from "./generic_gate.service";

@Injectable()
export class AuthService {

    constructor(private genericHttpService: GenericGateService) { }

    public login(obj: Object | undefined): Promise<any> {
        return this.genericHttpService.doHttpRequest('POST', '/login', obj);
    }

    public getUser(user_id: string): Promise<any> {
        return this.genericHttpService.doHttpRequest('GET', '/user/' + user_id);
    }
}