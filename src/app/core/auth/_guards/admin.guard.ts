// Angular
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../_services';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private auth: AuthService) { }
	canActivate() {
		if (this.auth.getCurrentUser()) {
			const user = this.auth.getCurrentUser().data;
			if (user.Role === 'Admin' || user.Role === 'Manager') {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
