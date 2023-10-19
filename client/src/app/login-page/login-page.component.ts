import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../shared/servises/auth.servise';
import { User } from '../shared/interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

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
        MaterialService.toast('Теперь вы можете зайти в систему, используя свои данные.')
      } else if (params['accssesDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в системе.')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заново.')
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
        MaterialService.toast(error.error.Error)
        this.form.enable()
      }
    )
  }

}
