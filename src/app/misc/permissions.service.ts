import { Injectable } from "@angular/core";
import { role } from "src/environments/environment";
import { UserStorageService } from "../services/user_storage.service";

@Injectable()

export class UserPermission {

    constructor(private userStorageSrv: UserStorageService) { }

    isAdmin() {
        let user_role = this.userStorageSrv.getRole();
        return user_role == role.admin;
    }
}