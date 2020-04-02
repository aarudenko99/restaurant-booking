// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class TutorialGuard implements CanActivate {

    constructor(private storage: Storage, private router: Router) {}

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {

        const isComplete = await this.storage.get('avgAccepted');

        if (!isComplete) {
            this.router.navigateByUrl('/avg-slides');
        }

        return isComplete;
    }
}
