import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.currentUser$;
  isLoggedIn$ = this.authService.isLoggedIn$;


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log(user);
    });
  }

  onLogout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    });
  }

}
