// Angular
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../_services';

@Injectable()
export class WaiterGuard implements CanActivate {
	constructor(private auth: AuthService) { }
	canActivate() {
		if (this.auth.getCurrentUser()) {
			const user = this.auth.getCurrentUser().data;
			if (user.Role === 'Waiter' || user.Role === 'Kitchen') {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
