import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthStateService } from './../../shared/auth-state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private authState: AuthStateService
  ) {
    this.registerForm = this.fb.group({
      tagname: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      name: [''],
      bio: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
      this.authService.register(this.registerForm.value).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          this.errors = error.error;
        },
        () => {
          this.registerForm.reset();
          this.router.navigate(['login']);
        }
      );
    }
}
