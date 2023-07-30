import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../shared/servises/auth.servise';
import { User } from '../shared/interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  
  constructor (private auth: AuthService,
               private router: Router,
               private route: ActivatedRoute) {
    
  }

  asub = new Subscription()

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  ngOnInit() {
    
    this.route.queryParams.subscribe((params: Params) => {
      if(params['/registered']) {
        //Пользователь зарегистрирован
      } else if (params['accssesDenied']) {
        //Пользователь не зарегистрирован
      }
    })

  }

  ngOnDestroy() {
    if (this.asub) {
      this.asub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    const user = {
      email: this.form.value.email || '',
      password: this.form.value.password || ''
    }

    this.asub = this.auth.login(user).subscribe(
      () => this.router.navigate(['/overview']),
      (error) => {
        console.warn(error)
        this.form.enable()
      }
    )
  }

}
