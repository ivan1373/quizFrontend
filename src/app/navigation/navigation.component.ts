import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );
  
  displayUserMenu$: Observable<boolean> = this.breakpointObserver.observe('(min-width: 600px)').pipe(
    map(result => result.matches),
    share()
  )

  constructor(private breakpointObserver: BreakpointObserver, private router: Router,
    public authenticationService: AuthService) {}

  logoutUser() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    
  }

}
