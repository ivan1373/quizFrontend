import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService,
        private _snackBar: MatSnackBar
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isadmin = this.authenticationService.currentTokenValue.isadmin;
        if (isadmin === false) {
            return true;
        }

        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });

        this._snackBar.open("You don't have permission to proceed!",'',{
            duration: 2000
          });
          
        return false;
    }
}