import { Injectable } from '@angular/core';
import { GlobalService } from "./global.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RequestObject } from "../objects/RequestObject";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { AppSettings } from "../app.settings";

@Injectable({
	providedIn: "root"
})
export abstract class AbstractService {
	protected offset = 0;
	protected limit = 25;

	apiUrl;

	constructor(public http: HttpClient, public globalService: GlobalService) {
		this.apiUrl = AppSettings.API_ENDPOINT;
	}

	getHeaders() {
		const currentUser = JSON.parse(localStorage.getItem("currentUser"));

		if (currentUser && currentUser.token) {
			const headers = new HttpHeaders({
				"x-access-token": currentUser.token,
				"content-type": "application/json"
			});
			return headers;
		}
	}

	httpGet(
		url,
		requestObject = new RequestObject(),
		onSuccess = (resp, listData) => {},
		onFail = err => {}
	) {
		// const data;
		const headers = this.getHeaders();

		return this.http
			.get(url, { headers, params: requestObject.data })
			.pipe(
				map(response => response),
				catchError(this.handleError)
			)
			.subscribe(
				resp => {
					if (!resp) {
						resp = { items: [] };
					}
					if (requestObject.loader) {
						this.globalService.onHideLoader.emit(
							requestObject.loaderId
						);
					}
					onSuccess(resp, {});
					requestObject.onDone(resp);
				},
				err => {
					if (requestObject.loader) {
						this.globalService.onHideLoader.emit(
							requestObject.loaderId
						);
					}

					// Execute own errorHandling when response has no errorHandling
					if (!requestObject.hasErrorHandling) {
						this.onError(err);
					}

					onFail(err);
					requestObject.onDone(err);
				}
			);
	}

	httpPost(
		url,
		requestObject = new RequestObject(),
		onSuccess = resp => {},
		onFail = err => {}
	) {
		const body =
			requestObject.options.bodyType === "json"
				? requestObject.getStringifiedBody()
				: requestObject.data;
		const headers = requestObject.headers
			? requestObject.headers
			: this.getHeaders();
		// const loaderId = (new Date()).getTime();

		// if (requestObject.loader) {
		//     requestObject.loaderId = loaderId;
		//     this.globalService.onShowLoader.emit({
		//         id: loaderId,
		//         loader: requestObject.loader
		//     });
		// }

		return this.http
			.post(url, body, {
				headers: headers,
				params: requestObject.getQueryParams()
			})
			.pipe(
				map(response => response),
				catchError(this.handleError)
			)
			.subscribe(
				resp => {
					if (requestObject.loader) {
						this.globalService.onHideLoader.emit(
							requestObject.loaderId
						);
					}
					onSuccess(resp);
					requestObject.onDone(resp);
				},
				err => {
					if (requestObject.loader) {
						this.globalService.onHideLoader.emit(
							requestObject.loaderId
						);
					}

					// Execute own errorHandling when response has no errorHandling
					if (!requestObject.hasErrorHandling) {
						this.onError(err);
					}
					requestObject.onDone(err);
					onFail(err);
				}
			);
	}

	httpPut(
		url,
		requestObject = new RequestObject(),
		onSuccess = resp => {},
		onFail = err => {}
	) {}

	httpDelete(
		url,
		requestObject = new RequestObject(),
		onSuccess = resp => {},
		onFail = err => {}
	) {
		const headers = requestObject.headers
			? requestObject.headers
			: this.getHeaders();
		const loaderId = new Date().getTime();

		if (requestObject.loader) {
			requestObject.loaderId = loaderId;
			this.globalService.onShowLoader.emit({
				id: loaderId,
				loader: requestObject.loader
			});
		}

		return this.http
			.delete(url, {
				headers: headers,
				params: requestObject.getQueryParams()
			})
			.pipe(
				map(response => response),
				catchError(this.handleError)
			)
			.subscribe(
				resp => {
					if (requestObject.loader) {
						this.globalService.onHideLoader.emit(
							requestObject.loaderId
						);
					}
					onSuccess(resp);
					requestObject.onDone(resp);
				},
				err => {
					if (requestObject.loader) {
						this.globalService.onHideLoader.emit(
							requestObject.loaderId
						);
					}

					// Execute own errorHandling when response has no errorHandling
					if (!requestObject.hasErrorHandling) {
						this.onError(err);
					}
					requestObject.onDone(err);
					onFail(err);
				}
			);
	}

	handleError(_error: any) {
		try {
			const error = _error;
			const errMsg = error.message
				? error.message
				: _error.status
				? `${_error.status} - ${_error.statusText}`
				: "Server error";

			console.log(error);

			if (error.error.message) {
				error.message_alert = error.error.message;
			} else {
				error.message_alert = error.statusText;
			}
			return throwError({
				message_alert: error.message_alert,
				message: error.message,
				status: _error.status,
				full_message: errMsg,
				data: error
			});
		} catch ($e) {
			return throwError({
				message_alert: "",
				message: "",
				status: _error.status ? _error.status : "",
				full_message: _error.statusText ? _error.statusText : "",
				data: {}
			});
		}
	}

	onError(error: any) {
		if (!this.globalService.hasConnection()) {
			this.globalService.noConnection();
		} else if (error.status === 503 && error.data.statusmeldingen) {
			// service unavailable with statusmeldingen from OSIRISLink
			// we are in maintenance!
			// const statusmelding: Statusmelding = error.data.statusmeldingen[0];
			console.log("service unavailable 503!");
			// this.globalService.onAppStateChanged.emit({type: 'blocked', message: statusmelding.tekst});
		} else if (error.status === 503) {
			// Are we in maintenance?!
			//             this.getMaintenanceApplication().then((response) => {
			//                if (response.onderhoud === true) {
			//                     console.log('we zijn in onderhoud');
			//                     this.globalService.onAppStateChanged.emit({type: 'blocked', message: response.melding});
			// //                   }
			//                } else {
			//                     // We are NOT in maintenance, something else went wrong...
			//                     console.log('service unavailable 503, algemene melding!');
			//                     // this.globalService.onAppStateChanged.emit({type: 'blocked', message: this.globalService.errorMessage
			//                         // ? this.globalService.errorMessage : this.globalService.translate('COMMON.ERROR.SUB_TITLE')});
			//                     this.globalService.onError.emit({
			//                         title: this.globalService.translate('COMMON.ERROR.TITLE'),
			//                         subTitle: this.globalService.translate('COMMON.ERROR.SUB_TITLE')
			//                     });
			//                }
			//             });
		} else if (error.data.error) {
			const redirectUrl: string =
				error.data.error["Authenticate-Redirect-Url"];
			if (error.status === 401 && redirectUrl) {
				// User is all ready signed out/unauthorized, go to login
				// this.globalService.deleteApiSecurityParams();
				window.location.hash = "/login";
			} else {
				console.log("general error occurred!");
				// this.globalService.onAppStateChanged.emit({type: 'blocked', message: this.globalService.errorMessage
				// ? this.globalService.errorMessage : this.globalService.translate('COMMON.ERROR.SUB_TITLE')});
				const err = {
					title: this.globalService.translate("COMMON.ERROR.TITLE"),
					subTitle: this.globalService.translate(
						"COMMON.ERROR.SUB_TITLE"
					),
					message: error.message_alert
				};
				// this.globalService.showError(err);
			}
		}
	}
}
