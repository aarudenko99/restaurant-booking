import { Injectable } from "@angular/core";
import { AppSettings } from "../app.settings";
import { HttpClient } from "@angular/common/http";
import { GlobalService } from "./global.service";
import { AbstractService } from "./abstract.service";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root"
})
export class MenuCategoryService extends AbstractService {
	apiURL = AppSettings.API_ENDPOINT;

	constructor(public http: HttpClient, public globalService: GlobalService) {
		super(http, globalService);
	}

	getAllMenuCategory() {
		return this.http
			.get(this.apiURL + "/api/menucategory", {
				headers: this.getHeaders()
			})
			.pipe(map((response: any) => response));
	}
}
