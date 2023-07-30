import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/servises/auth.servise';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  constructor(private auth: AuthService,
              private router: Router,
              ) {

  }

  asub = new Subscription()

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    const user = {
      email: this.form.value.email || '',
      password: this.form.value.password || ''
    }

    this.form.disable()
    this.asub = this.auth.register(user).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      }, 
      err => {
        console.warn(err)
        this.form.enable()
      }
    )
  }

  ngOnDestroy() {
    if (this.asub) {
      this.asub.unsubscribe()
    }
  }

}
