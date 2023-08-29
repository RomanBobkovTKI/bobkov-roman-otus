import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

const uri = 'http://localhost:4000'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink, cookieService: CookieService): ApolloClientOptions<any> {

  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}