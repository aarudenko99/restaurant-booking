import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { ErrorDialogService } from "../../../services/error-dialog.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private router: Router,
		private authService: AuthService,
		private errorDialogService: ErrorDialogService
	) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError(err => {
				let data = {};
				data = {
					status: err.status,
					title: err.error.message
						? err.error.message.statusText
						: "Fout melding",
					message: err.error.message
						? err.error.message.error.message
						: "Er is een fout opgetreden probeer het opnieuw."
				};

				if (err.status === 401 || err.status === 403) {
					// auto logout if 401 response returned from api
					this.authService.logout();
					this.router.navigateByUrl("/auth/login");
				}

				this.errorDialogService.openDialog(data);
				return throwError(data);
			})
		);
	}
}
