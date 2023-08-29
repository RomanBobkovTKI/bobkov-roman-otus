import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CONFIRM,  AUTH} from './graphql/graphql.queries';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  token?: String
  result?: Boolean
  error: any;

  constructor(private apollo: Apollo,
              private cookieService: CookieService) { }

  
  confirm() {
    this.apollo.watchQuery({
      query: CONFIRM
    }).valueChanges.subscribe(({ data }: any) => {
      this.result = data.confirm;
      console.log(this.cookieService.get('token') + 'from components')
    });
  }

  auth() {
    this.apollo.mutate({
      mutation: AUTH,
    }).subscribe(({data}: any) => {
      this.token = data.auth;
      this.cookieService.set('token', `${this.token}`);
    }
    , (error) => {
      this.error = error;
    });
  }

  ngOnInit(): void {
    
  }
}

