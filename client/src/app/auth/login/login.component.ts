import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, public toast: HotToastService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  handleLogin() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: user => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        const errorMessage = err.message;
        if (errorMessage == 'Firebase: Error (auth/wrong-password).' || errorMessage == 'Firebase: Error (auth/user-not-found).') {
          this.toast.error(`Incorrect email or password`)
        }


        this.loginForm.controls['password'].setValue('');
      }
    });
  }
}
