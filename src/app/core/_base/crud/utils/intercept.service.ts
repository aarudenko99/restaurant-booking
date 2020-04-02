// Angular
import { Injectable } from "@angular/core";
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpResponse
} from "@angular/common/http";
// RxJS
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AbstractService } from "../../../../services/abstract.service";

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService extends AbstractService
	implements HttpInterceptor {
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			tap(
				event => {
					if (event instanceof HttpResponse) {
						// http response status code
						// console.log(event.status);
					}
				},
				error => {
					// http response status code
					// console.log(error.status);
					// console.log(error.error.message);
					this.handleError(error);
				}
			)
		);
	}
}
